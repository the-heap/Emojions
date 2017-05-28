import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from pprint import pprint
from tinydb import TinyDB, Query


# ====== INITIALIZATIONS ====== #

APP = Flask(__name__)
APP.debug = True
DB = TinyDB('db.json')
CORS(APP)


# ====== API ROUTES ====== #


@APP.route('/getEmojisCount', methods=['GET'])
def get_emojis():
    ''' Returns emoji count '''

    payload = {}
    db_dump = DB.all()

    # serialize database request.
    # formatting the db output to front end. tinyDB does not insert data the
    # same way as the front end is formatted. So we are creating a sorted out
    # payload that removes ids' and keys (like "data") and sending. Not ideal.
    for emojion_group in db_dump:
        e_id = emojion_group["id"]
        e_data = emojion_group["data"][e_id]
        payload[e_id] = e_data

    return jsonify(payload)


@APP.route('/save_new_emojis', methods=['POST'])
def save_emojis():
    '''
    Retrieve incoming data from front end; Write to the json database
    After writing, reopen the database; re-read and send it to the front end.
    NOTE: Currently we are blowing away and rewriting the entire JSON db; this will need
    to be optimized if we decide to go with a flat file "db" otherwise; -> sqllite / mongo
    '''

    if request.method == 'POST':
        data = request.get_json()  # incoming data
        payload = {}               # outgoing data
        emojion = Query()          # What we are querying the DB for

        # format data to have an id based on incoming json keys
        for key in data:
            emoji_struct = data[key]
            payload['id'] = key
            payload['data'] = {key: emoji_struct}

            if len(DB.search(emojion.id == key)) == 0:
                print("Hey you found somehting not inthe DB, we'll put it in", key)
                DB.insert(payload)

        return jsonify({"sup": "hi"})
        # return jsonify(DB.all())

    # TODO: handle if not a POST request.


@APP.route('/update_emoji_count', methods=['POST'])
def update_emoji_count():
    '''Updates emoji count for an emojion bar in the db'''

    payload = request.get_json()
    DB.update({'data': payload['data']}, Query().id == payload['id'])
    return jsonify({"sup": "hi"})


## HELPERS ##
def merge_dicts(x, y):
    z = x.copy()
    z.update(y)
    return z

if __name__ == '__main__':
    APP.run(host="0.0.0.0", debug=True)
