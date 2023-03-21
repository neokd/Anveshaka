from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from flask_jwt_extended import current_user,create_access_token,jwt_required,JWTManager

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET','backend/')
jwt = JWTManager(app)

@app.route('/token',methods = ['POST'])
def create_token():
    email = request.json.get('email',None)
    print(email)
    password = request.json.get('password',None)
    if email != "test" and password != "test":
        return jsonify({'msg':"Bad Password request"})
    access_token = create_access_token(identity=email)
    return jsonify({
        "access_token":access_token
    })

@app.route("/",methods=['GET','POST'])
def index():
    return "<h1>Hello World</h1>"

@app.route('/data',methods=['GET','POST'])
def getData():
    if request.method == 'GET':
        return {
            "head":"Anveshaka"
        }
    elif request.method == 'POST':
        byteString = request.get_data()
        jsonString = byteString.decode('utf-8')
        jsonData = json.loads(jsonString)
        print("User Typed -> "+jsonData['header'])
        return {
            "head":jsonData['header']
        }

if __name__ == '__main__':
    app.run(debug=True,port=5000)