#!/bin/bash

echo "Installing Gent Styleguide..."
yarn install;

echo "Removing old build directory..."
rm -rf ../build

echo "Building the Gent basetheme..."
mkdir ../build && mkdir ../build/styleguide && mkdir ../build/js && mkdir ../build/vendor;
cp -R ./node_modules/gent_styleguide/build/styleguide/fonts ../build/styleguide/fonts
cp -R ./node_modules/gent_styleguide/build/styleguide/img ../build/styleguide/img
cp -R ./node_modules/gent_styleguide/build/styleguide/js ../build/styleguide/js
cp -R ./node_modules/lightgallery/ ../build/vendor/lightgallery

echo "Building Gent basetheme js..."
gulp build

echo "The Gent basetheme is successfully installed!"
