########################################
#              Imports
########################################
from flask import Flask, jsonify, render_template, send_from_directory
import pandas as pd

########################################
#            Configuration
########################################

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_url_path='')
app.config["CACHE_TYPE"] = "null"

# Database Config (SQL Alchemy / PyMongo / other)

########################################
#               Routes
########################################

# Section 1 - HTML/Web Pages
@app.route("/") # 127.0.0.1:5000/
def home():
    print('test')
    return render_template("index.html")

@app.route('/js/<path:path>')
def send_js(path):
  print(path)
  return send_from_directory('js', path)
    
@app.route('/map') # 127.0.0.1:5000/
def map():
  return render_template('visualization.html')

@app.route('/chart') # 127.0.0.1:5000/
def chart():
  return render_template('chart_moving.html')


# Section 2 - API Endpoints
@app.route('/resources') # 127.0.0.1:5000/resources
def resources():
  df = pd.read_csv('Resources/Clean_Alcoholic_Beverages_df.csv')

  result = df.to_dict(orient="records") # [{''}, {''}]

  return jsonify(result)

########################################
#           Initialization
########################################
if __name__ == "__main__":
  app.run(debug=True)