#!/bin/sh

ZIP_NAME=picavista.zip

rm -f $ZIP_NAME

cd src

zip -r ../$ZIP_NAME *

cd ..
