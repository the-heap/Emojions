from flask import Flask, jsonify

app = Flask(__name__)

DATABASE = '/snippet.db'

emoji = {
  "emojion_asdf": [{
      "count": 3,
      "icon": "💩",
      "id": "emojion_asdf_0"
    },
    {
      "count": 1,
      "icon": "😱",
      "id": "emojion_asdf_1"
    },
    {
      "count": 9,
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

#Initial route to connect to an HTTP endpoint
@app.route('/')
def index():
    return "Hello World!"

@app.route('/getEmojisCount', methods=['GET'])
def getEmojis():
    return jsonify({'emojis': emoji})
    pass

@app.route('/saveEmojis', methods=['POST'])
def saveEmojis():
    # Code stub TODO
    pass

    if __name__ == '__main__':
        app.run(debug=True)

