from typing import List
from flask import request
from flask import Flask
from fcatools.triadic.triadic_context import TriadicContext
from fcatools.dyadic.dyadic_concept import DyadicConcept
from fcatools.triadic.triadic_incidence import TriadicIncidence

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello World"


@app.route('/fcatools', methods=['POST'])
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
        dyadic_context_from_triadic.write_dyadic_context_data(
            "dyadic_context.data")
        concepts = DyadicConcept.get_concepts_d_peeler(
            "dyadic_context.data", "dyadic_concepts.data")

        return vars(concepts[0])
    return


if __name__ == "__main__":
    app.run()
