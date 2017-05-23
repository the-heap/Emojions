from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)

# Temporary dummy database
db = json.loads(open('snippet.json', 'r', encoding='utf-8').read())

@app.route('/getEmojisCount', methods=['GET'])
def getEmojis():
    ''' Returns emoji count '''
    return jsonify(db)

@app.route('/saveEmojis', methods=['POST'])
def saveEmojis():
    if request.method == 'POST':
        value = request.get_json()
        with open('snippet.json', 'w', encoding='utf-8') as jsondata:
            json.dump(value, jsondata)
        return jsonify('Successful parse!')

if __name__ == '__main__':
    app.run(debug=True)

