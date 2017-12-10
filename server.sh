#!/bin/bash

rm -r build
yarn build
python server/app.py