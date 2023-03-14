from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/",methods=['GET','POST'])
def index():
    return "Hello World"

@app.route('/data')
def get_time():
    return {
        "head":"helloo"
    }

if __name__ == '__main__':
    app.run(debug=True)