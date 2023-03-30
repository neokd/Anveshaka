from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from flask_jwt_extended import current_user,create_access_token,jwt_required,JWTManager
import scrape
import wikipedia
from transformers import T5Tokenizer, T5ForConditionalGeneration

app = Flask(__name__)
CORS(app)
query = ''
links = ''
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

@app.route('/api/data',methods=['GET','POST'])
def getData():
    global query,links
    if request.method == 'GET':
        return {
            "title":"Anveshaka"
        }
    elif request.method == 'POST':
        byteString = request.get_data()
        jsonString = byteString.decode('utf-8') 
        jsonData = json.loads(jsonString)
        print("User Typed -> "+jsonData['header'])
        query = jsonData['header']
        links = scrape.scrape_google_news(query)
        return {
            "head":jsonData['header']
        }

@app.route('/api/head',methods=['GET'])
def head():
    global query
    return {
        'heading':query
    }

@app.route('/api/success',methods=['GET'])
def success():
    scrape.write_json(links)
    return jsonify(scrape.extract_json())

@app.route('/api/generate',methods=['GET'])
async def generate():
    global query
    try:
        tokenizer = T5Tokenizer.from_pretrained('t5-small')
        model = T5ForConditionalGeneration.from_pretrained('t5-small')
        input_ids = tokenizer.encode(wikipedia.summary(query), return_tensors='pt')
        summary_ids = model.generate(input_ids, max_length=400, num_beams=4, early_stopping=True)
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        print(summary)
        return {
            'generated':summary
        }
    except:
        return {
            "generated":"Sorry, Couldn't fetch the data"
        }

if __name__ == '__main__':
    app.run(debug=True,port=5000)