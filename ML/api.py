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



import numpy as np
import argparse
import time
import cv2
import os
'''
# construct the argument parse and parse the arguments
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="path to input image")
ap.add_argument("-y", "--yolo", required=True,
	help="base path to YOLO directory")
ap.add_argument("-c", "--confidence", type=float, default=0.5,
	help="minimum probability to filter weak detections")
ap.add_argument("-t", "--threshold", type=float, default=0.3,
	help="threshold when applyong non-maxima suppression")
args = vars(ap.parse_args())
'''
# load the COCO class labels our YOLO model was trained on
labelsPath = ("coco.names")
LABELS = open(labelsPath).read().strip().split("\n")
#print(LABELS)

# initialize a list of colors to represent each possible class label
np.random.seed(42)
COLORS = np.random.randint(0, 255, size=(len(LABELS), 3),
	dtype="uint8")

# derive the paths to the YOLO weights and model configuration
modelConfiguration = "yolov3.cfg";
modelWeights = "yolov3.weights";
 
def getOutputsNames(net):
# Get the names of all the layers in the network
    layersNames = net.getLayerNames()
    # Get the names of the output layers, i.e. the layers with unconnected outputs
    return [layersNames[i - 1] for i in net.getUnconnectedOutLayers()]

net = cv2.dnn.readNetFromDarknet(modelConfiguration, modelWeights)
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_OPENCV)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CPU)

@app.route("/detect",methods = ['POST'])
def detect():
    data = request.get_json(force = True)
    # print(data)
    image = np.array(data)
    # image = image.astype('uint8')

    image = ((image / np.max(image)) * 255).astype('uint8')

    # (H, W) = image.shape[:2]
    # print("The iiumage shape is:",image.shape)
    # determine only the *output* layer names that we need from YOLO
    blob = cv2.dnn.blobFromImage(image, size = (416,416), mean = (0,0,0), swapRB=False, crop=False)
 
    # Sets the input to the network
    net.setInput(blob)
 
    # Runs the forward pass to get output of the output layers
    outs = net.forward(getOutputsNames(net))
    # end = time.time()
    #print("The layers are:",layerOutputs)

    # show timing information on YOLO
    # print("[INFO] YOLO took {:.6f} seconds".format(end - start))

    # initialize our lists of detected bounding boxes, confidences, and
    # class IDs, respectively
    boxes = []
    confidences = []
    classIDs = []

    # loop over each of the layer outputs
    for output in outs:
    # loop over each of the detections
        for detection in output:
            #print(detection)
            # extract the class ID and confidence (i.e., probability) of
            # the current object detection
            
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]
            if confidence!=0:
                print(confidence)

            bicycle_cnt = 0
            vehicle_cnt = 0
            people_cnt = 0
            # filter out weak predictions by ensuring the detected
            # probability is greater than the minimum probability
            if confidence > 0.40 and classID == 4:
                bicycle_cnt = bicycle_cnt + 1
            if confidence > 0.40 and classID == 2:
                vehicle_cnt = vehicle_cnt+ 1
            if confidence > 0.40 and classID == 0:
                people_cnt = people_cnt+ 1
    return bicycle_cnt,vehicle_cnt , people_cnt

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
    print(val)
    return jsonify(val.tolist())

if __name__ == '__main__':
    app.run(port=5000, debug=True)