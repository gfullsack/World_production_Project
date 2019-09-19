########################################
#              Imports
########################################
from flask import Flask, jsonify, render_template
import pandas as pd

########################################
#            Configuration
########################################

# Flask App Config
app = Flask(__name__)

# Database Config (SQL Alchemy / PyMongo / other)

########################################
#               Routes
########################################

# Section 1 - HTML/Web Pages
@app.route('/') # 127.0.0.1:5000/
def home():
  return render_template('visualization.html')

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
  app.run()