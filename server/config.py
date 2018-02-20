# Raspberry Pi Face Recognition Treasure Box Configuration
# Copyright 2013 Tony DiCola 

# Threshold for the confidence of a recognized face before it's considered a
# positive match.  Confidence values below this threshold will be considered
# a positive match because the lower the confidence value, or distance, the
# more confident the algorithm is that the face was correctly detected.
# Start with a value of 3000, but you might need to tweak this value down if 
# you're getting too many false positives (incorrectly recognized faces), or up
# if too many false negatives (undetected faces).
POSITIVE_THRESHOLD = 3000.0

# File to save and load face recognizer model.
TRAINING_FILE = 'training.xml'


# Value for positive and negative labels passed to face recognition model.
# Can be any integer values, but must be unique from each other.
# You shouldn't have to change these values.
POSITIVE_LABEL = 1
NEGATIVE_LABEL = 2

# Size (in pixels) to resize images for training and prediction.
# Don't change this unless you also change the size of the training images.
FACE_WIDTH  = 92
FACE_HEIGHT = 112


HAAR_FACES         = 'haarcascade_frontalface.xml'
HAAR_SCALE_FACTOR  = 1.3
HAAR_MIN_NEIGHBORS = 4
HAAR_MIN_SIZE      = (30, 30)

