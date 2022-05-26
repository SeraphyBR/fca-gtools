import os
import sys
from typing import List
from flask import request
from flask import Flask
from flask import jsonify
from flask.json import JSONEncoder
from fcatools.triadic.triadic_context import TriadicContext
from fcatools.dyadic.dyadic_concept import DyadicConcept
from fcatools.triadic.triadic_incidence import TriadicIncidence
from fcatools.triadic.triadic_concept import TriadicConcept
from fcatools.dyadic.dyadic_lattice import DyadicLattice
from fcatools.dyadic.dyadic_generator import DyadicGenerator
from fcatools.triadic.triadic_association_rule import TriadicAssociationRule
import tempfile

app = Flask(__name__)


class MyJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, TriadicAssociationRule):
            return {
                'left_side': list(obj.left_side),
                'right_side': list(obj.right_side),
                'condition': list(obj.condition),
                'support': obj.support,
                'confidence': obj.confidence
            }
        if isinstance(obj, TriadicConcept):
            return {
                'objects': list(obj.objects),
                'attrs': list(obj.attrs),
                'conditions': list(obj.conditions)
            }
        return super(MyJSONEncoder, self).default(obj)


app.json_encoder = MyJSONEncoder


@app.route("/")
def hello_world():
    return "Hello World"


@app.route('/fcatools/rules', methods=['POST'])
def fca_tools():
    if request.method == 'POST':
        data = request.json
        incidences: List[TriadicIncidence] = list()
        for item in data['incidences']:
            incidences.append(TriadicIncidence(
                item['obj'], item['attr'], item['conditions']))
        triadic_context = TriadicContext(
            incidences, data['objects'], data['attributes'], data['conditions'])
        dyadic_context_from_triadic = triadic_context.flat_triadic_to_dyadic()

        tempdirname = tempfile.gettempdir()

        filename_context = os.path.join(tempdirname, "context.data")
        filename_concept = os.path.join(tempdirname, "concepts.data")

        dyadic_context_from_triadic.write_dyadic_context_data(filename_context)
        concepts = DyadicConcept.get_concepts_d_peeler(
            filename_context, filename_concept)

        lattice, _ = DyadicLattice.build_lattice_iPred(concepts)

        generators = lattice.compute_generators()

        dyadic_association_rules = lattice.compute_association_rules(
            generators)

        bacars_implication_rules, bacars_association_rules = TriadicAssociationRule.calculate_bacars_from_dyadic_rules(
            dyadic_association_rules, '.')
        bcaars_implication_rules, bcaars_association_rules = TriadicAssociationRule.calculate_bcaars_from_dyadic_rules(
            dyadic_association_rules, '.')

        return jsonify(
            bacars_implication_rules=bacars_implication_rules,
            bacars_association_rules=bacars_association_rules,
            bcaars_association_rules=bcaars_association_rules,
            bcaars_implication_rules=bcaars_implication_rules
        )
    return


@app.route('/fcatools/concepts', methods=['POST'])
def fca_tools_concepts():
    if request.method == 'POST':
        data = request.json
        incidences: List[TriadicIncidence] = list()
        for item in data['incidences']:
            incidences.append(TriadicIncidence(
                item['obj'], item['attr'], item['conditions']))
        triadic_context = TriadicContext(
            incidences, data['objects'], data['attributes'], data['conditions'])

        tempdirname = tempfile.gettempdir()

        filename_context = os.path.join(tempdirname, "context.data")
        filename_concept = os.path.join(tempdirname, "concepts.data")

        triadic_context.write_triadic_context_data(filename_context)
        concepts = TriadicConcept.get_concepts_d_peeler(
            filename_context, filename_concept)

        return jsonify(concepts)
    return


if __name__ == "__main__":
    args = sys.argv[1:]
    if len(args) == 0:
        app.run(host="127.0.0.1", port=5000)
    else:
        app.run(host=args[0], port=args[1])
