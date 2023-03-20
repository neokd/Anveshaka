from flask import Flask, jsonify, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route("/",methods=['GET','POST'])
def index():
    return "<h1>Hello World</h1>"

@app.route('/data',methods=['GET','POST'])
def getData():
    if request.method == 'GET':
        return {
            "head":"Anveshaka"
        }
    else:
        byteString = request.get_data()
        jsonString = byteString.decode('utf-8')
        jsonData = json.loads(jsonString)
        print("User Typed -> "+jsonData['header'])
        return {
            "head":"POSt"
        }



if __name__ == '__main__':
    app.run(debug=True)