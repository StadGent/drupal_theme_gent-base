#!/bin/bash

echo "Installing Gent Styleguide..."
yarn install;

echo "Removing old build directory..."
rm -rf ../build

echo "Building the Gent basetheme..."
mkdir ../build && mkdir ../build/styleguide && mkdir ../build/js;
cp -R ../styleguide/build/styleguide/fonts ../build/styleguide/fonts;
cp -R ../styleguide/build/styleguide/img ../build/styleguide/img;
cp -R ../styleguide/build/styleguide/js ../build/styleguide/js;
cp -R ../styleguide/build/styleguide/vendor ../build/styleguide/vendor;

echo "Building Gent basetheme js..."
gulp build

echo "The Gent basetheme is successfully installed!"
