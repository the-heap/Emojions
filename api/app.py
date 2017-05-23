import json
from flask import Flask, jsonify, request
from flask_cors import CORS

# Initialize flask and enable CORS support.
APP = Flask(__name__)
CORS(APP)

# Temporary dummy database
# def open_database


def read_db():
    return json.loads(open('db.json', 'r', encoding='utf-8').read())


def write_db():
    pass

DB = json.loads(open('db.json', 'r', encoding='utf-8').read())


@APP.route('/getEmojisCount', methods=['GET'])
def get_emojis():
    ''' Returns emoji count '''
    return jsonify(DB)


@APP.route('/saveEmojis', methods=['POST'])
def save_emojis():
    '''
    Retrieve incoming data from front end; Write to the json database
    After writing, reopen the database; re-read and send it to the front end.
    NOTE: Currently we are blowing away and rewriting the entire JSON db; this will need
    to be optimized if we decide to go with a flat file "db" otherwise; -> sqllite / mongo
    '''
    if request.method == 'POST':
        # Read data from the front end
        value = request.get_json()

        with open('db.json', 'w', encoding='utf-8') as jsondata:  # open the "db"
            # dump new data into the json file.
            json.dump(value, jsondata)

        db = read_db()
        return jsonify(db)

    # TODO: handle if not a POST request.

if __name__ == '__main__':
    APP.run(debug=True)
