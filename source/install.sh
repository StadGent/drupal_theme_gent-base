#!/bin/bash

echo "Installing Gent Styleguide..."
npm install;

echo "Removing old build directory..."
rm -rf ../build

echo "Building the Gent basetheme..."
mkdir ../build && mkdir ../build/styleguide;
mv ./node_modules/gent_styleguide/build/styleguide/fonts ../build/styleguide/fonts
mv ./node_modules/gent_styleguide/build/styleguide/img ../build/styleguide/img
mv ./node_modules/gent_styleguide/build/styleguide/js ../build/styleguide/js

echo "The Gent basetheme is successfully installed!"
