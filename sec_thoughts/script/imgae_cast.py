import os
import sys

import numpy as np

# pip3 install opencv-python
import cv2


if len(sys.argv) < 2:
    print("Usage: python imgae_cast.py <filename>")
    sys.exit(1)


def mankaize(file_path:str):
    assert(os.path.exists(file_path))
    file_name, file_extension = os.path.splitext(file_path)

    # edge detection
    img = cv2.imread(file_path)
    grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(grey, 20, 200)

    edges = cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR)
    edges[np.where((edges != [0, 0, 0]).all(axis=1))] = [255, 255, 255]
    color = cv2.bilateralFilter(img, 9, 300, 300)
    cartoon = cv2.bitwise_and(color, edges)
    cartoon = cv2.bitwise_not(cartoon)

    cv2.imwrite(f'{file_name}_new{file_extension}', cartoon)

file_path = sys.argv[1]
mankaize(file_path)
