import json
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize flask and enable CORS support.
APP = Flask(__name__)
CORS(APP)

# Temporary dummy database
DB = json.loads(open('snippet.json', 'r', encoding='utf-8').read())


@APP.route('/getEmojisCount', methods=['GET'])
def get_emojis():
    ''' Returns emoji count '''
    return jsonify(DB)


@APP.route('/saveEmojis', methods=['POST'])
def save_emojis():
    '''Saves emoji data to a DB (in this case a flat json file'''
    if request.method == 'POST':
        value = request.get_json()
        with open('snippet.json', 'w', encoding='utf-8') as jsondata:
            json.dump(value, jsondata)
        return jsonify('Successful parse!')

if __name__ == '__main__':
    APP.run(debug=True)
