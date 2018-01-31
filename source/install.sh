#!/bin/bash

echo "Installing Gent Styleguide..."
yarn install;

echo "Removing old build directory..."
rm -rf ../build

echo "Building the Gent basetheme..."
mkdir ../build && mkdir ../build/js;

echo "Building Gent basetheme js..."
gulp build

echo "The Gent basetheme is successfully installed!"
