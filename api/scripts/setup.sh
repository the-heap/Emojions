# create a virtual env
echo Creating a python virtual environment...
python3 -m venv venv

echo Entering virtual environment...
source venv/bin/activate

echo Installing requirements
pip install -r requirements.txt

echo running project:
source venv/bin/activate;
export FLASK_APP=app.py;
python -m flask run
