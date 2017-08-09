#!/bin/bash

echo "Installing Gent Styleguide..."
npm install;

echo "Removing old build directory..."
rm -rf ./build

echo "Building the Gent basetheme..."
mv ./node_modules/gent_styleguide/build ./
rm -rf ./node_modules

echo "The Gent basetheme is successfully installed!"
