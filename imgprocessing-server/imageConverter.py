import cv2
import numpy as np
import sys

def converter(before, contrastTouch=False):
    try:
        colorImg = cv2.imdecode(np.fromstring(before, dtype=np.uint8), cv2.IMREAD_COLOR)
        #colorImg = cv2.imread(fileName, cv2.IMREAD_COLOR)
        grayscaled = cv2.cvtColor(colorImg, cv2.COLOR_BGR2GRAY)
        
        after = np.zeros([*grayscaled.shape, 4], dtype=np.uint8)
        after[:] = 255

        if (contrastTouch):
            touched = cv2.normalize(grayscaled, None, 0, 255, cv2.NORM_MINMAX)
            after[:, :, 3] = touched
        else:
            after[:, :, 3] = grayscaled
        
        success, encodedImage = cv2.imencode('.png', after)
        return encodedImage.tobytes()
        #cv2.imwrite(outPath, after)
    except:
        return "?"
