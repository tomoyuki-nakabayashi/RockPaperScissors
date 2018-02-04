# -*- coding: utf-8 -*-
import os
import cv2
import requests

PHOTO_PATH = os.path.join("~/.node-red/public/images/camera.jpg")
URL = "http://localhost:1880/red/camera"

 # /dev/video0
VIDEO = cv2.VideoCapture(0)
FPS = VIDEO.get(cv2.CAP_PROP_FPS) # 1 request per 1 sec.
timestamp = 0
adjust_fps = 0

while(True):
    ret, frame = VIDEO.read()
#    cv2.imshow('frame', frame) # Show for debug

    # Exit if "q" pressed
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break

    # Save 1 frame per 1 second
    if adjust_fps % FPS == 0:
        cv2.imwrite(PHOTO_PATH, frame)
        files = {'upload_file': open(PHOTO_PATH, "rb")}
        res = requests.post(URL, files=files)
        timestamp += 1

    adjust_fps += 1

# When everything done, release the capture
VIDEO.release()
cv2.destroyAllWindows()
