from flask import Flask
from src.fcatools.dyadic.dyadic_incidence import DyadicIncidence

app = Flask(__name__)


@app.route("/")
def hello_world():
    teste = DyadicIncidence("a", ["tes", "te23"])
    return vars(teste)


if __name__ == "__main__":
    app.run()
