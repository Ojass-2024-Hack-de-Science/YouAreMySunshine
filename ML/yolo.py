# USAGE
# python yolo.py --image images/baggage_claim.jpg --yolo yolo-coco

# import the necessary packages
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
weightsPath = ("C:\\Users\\hp\\Desktop\\webots_iot_hack\\controllers\\slave\\pretrained-yolov3-for-object-detection\\yolov3.weights")
configPath = ( "C:\\Users\\hp\\Desktop\\webots_iot_hack\\controllers\\slave\\pretrained-yolov3-for-object-detection\\yolov3.cfg")

# load our YOLO object detector trained on COCO dataset (80 classes)
print("[INFO] loading YOLO from disk...")
net = cv2.dnn.readNet(configPath, weightsPath)

# load our input image and grab its spatial dimensions



# construct a blob from the input image and then perform a forward
# pass of the YOLO object detector, giving us our bounding boxes and
# associated probabilities


def predict(image):
	#image = cv2.imread("example.jpg")
	#print(image)
	(H, W) = image.shape[:2]
	# print("The iiumage shape is:",image.shape)
	# determine only the *output* layer names that we need from YOLO
	ln = net.getLayerNames()
	# print("ln at start::",ln)
	ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]
	result = []
	# print("The result is:",result)
	# print("ln at end:",ln)
	# image = image.astype('float32')
	image = np.array(image,dtype = 'uint8')
	blob = cv2.dnn.blobFromImage(image, 1 / 255.0, (416, 416),
		swapRB=True, crop=False)
	net.setInput(blob)
	start = time.time()
	layerOutputs = net.forward(ln)
	end = time.time()
	#print("The layers are:",layerOutputs)

	# show timing information on YOLO
	# print("[INFO] YOLO took {:.6f} seconds".format(end - start))

	# initialize our lists of detected bounding boxes, confidences, and
	# class IDs, respectively
	boxes = []
	confidences = []
	classIDs = []

	# loop over each of the layer outputs
	for output in layerOutputs:
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
			# filter out weak predictions by ensuring the detected
			# probability is greater than the minimum probability
			if confidence > 0.40 and classID == 4:
				bicycle_cnt = bicycle_cnt + 1
			if confidence > 0.40 and classID == 2:
				vehicle_cnt = vehicle_cnt+ 1
	
	return bicycle_cnt,vehicle_cnt

# to integrate with mongodb code for scalability factor