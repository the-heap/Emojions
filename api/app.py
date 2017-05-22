from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

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

'''
Install pip packages (inside directory):
pip install 

To initialize server:
export FLASK_APP=app.py
python -m flask run 
'''
