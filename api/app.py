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
    # Code stud TODO
    if request.method == 'POST':
        value = request.get_json()
        for key in value:
            print(db[key])

        '''Need to access the variables inside each 'key' variable '''
        return jsonify('Successful parse!')

''' Take front end data, compare to backend data'''

'''
- Open json file
- Validate if the data exists already
- if not():
- append to end of json file
- else:
- update to unique ID
'''

if __name__ == '__main__':
    app.run(debug=True)

