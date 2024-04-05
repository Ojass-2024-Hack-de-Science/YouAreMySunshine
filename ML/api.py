from flask import Flask , request,jsonify
import numpy as np
import pandas as pd
import pickle

app = Flask(__name__)
from keras.models import model_from_json

with open("model1.json", "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model1 = model_from_json(loaded_model_json)

loaded_model1.load_weights("model_weights1.weights.h5")

with open("model2.json", "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model2 = model_from_json(loaded_model_json)

loaded_model2.load_weights("model_weights2.weights.h5")

with open("model3.json", "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model3 = model_from_json(loaded_model_json)

loaded_model3.load_weights("model_weights3.weights.h5")

with open("model4.json", "r") as json_file:
    loaded_model_json = json_file.read()
loaded_model4 = model_from_json(loaded_model_json)

loaded_model4.load_weights("model_weights4.weights.h5")

@app.route("/",methods = ['POST'])
def prediction():
    data = request.get_json(force=True)
    option = data['option']
    # It must be an dictionary
    arr = []
    arr.append(data['data'])
    model = ''
    if option == '1':
        model = loaded_model1
    elif option == '2':
        model = loaded_model2
    elif option == '3':
        model = loaded_model3
    elif option == '4':
        model = loaded_model4   
    val = model.predict(np.array(arr))
    return jsonify(val.tolist())

if __name__ == '__main__':
    app.run(port=5000, debug=True)