# -*- coding: utf-8 -*-
import os
import cv2

PHOTO_DIR = os.path.join(os.getcwd(), "photos")

 # /dev/video0
VIDEO = cv2.VideoCapture(0)
FPS = VIDEO.get(cv2.CAP_PROP_FPS)
timestamp = 0
adjust_fps = 0

while(True):
    ret, frame = VIDEO.read()
    cv2.imshow('frame', frame) # Show for debug

    # Exit if "q" pressed
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break

    # Save 1 frame per 1 second
    if adjust_fps % FPS == 0:
        path = os.path.join(PHOTO_DIR, "photo{0:05d}.jpg".format(timestamp))
        cv2.imwrite(path, frame)
        timestamp += 1

    adjust_fps += 1

# When everything done, release the capture
VIDEO.release()
cv2.destroyAllWindows()
