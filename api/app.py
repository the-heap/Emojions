from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

# Temporary dummy database
emoji = {
    "emojion_asdf": [{
        "count": 1,
        "icon": "💩",
        "id": "emojion_asdf_0"
    },
        {
        "count": 3,
        "icon": "😱",
        "id": "emojion_asdf_1"
    },
        {
        "count": 3,
        "icon": "✅",
        "id": "emojion_asdf_2"
    },
        {
        "count": 3,
        "icon": "🙀",
        "id": "emojion_asdf_3"
    },
        {
        "count": 3,
        "icon": "✅",
        "id": "emojion_asdf_4"
    }
    ]
}


@app.route('/getEmojisCount', methods=['GET'])
def getEmojis():
    ''' Returns emoji count '''
    return jsonify(emoji)


@app.route('/saveEmojis', methods=['POST'])
def saveEmojis():
    # Code stub TODO
    pass

if __name__ == '__main__':
    app.run(debug=True)