#!/bin/bash

# Check if yarn is installed on your system.
if ! [ -x "$(command -v yarn)" ]; then
  echo 'Error: yarn is not installed. Please install yarn globally to execute this script.' >&2
  exit 1
fi

echo "Removing old gent_base 'build' directory...";
rm -rf ../build;

echo "Recreating gent_base 'build' directory...";
mkdir ../build && mkdir ../build/js;

echo "Building - style guide - in gent_base...";
cd ../styleguide;
yarn install;

echo "Copy public files to build...";
cp -rf ./public/** ./build

./node_modules/.bin/gulp iconfont;
./node_modules/.bin/gulp styles:extract;
./node_modules/.bin/gulp js:build;
./node_modules/.bin/gulp images:minify;

echo "Executing - style guide - postinstall script...";
cd scripts;
sh ./postinstall.sh;

echo "Building gent_base...";
cd ../../source;
yarn install;
./node_modules/.bin/gulp build;
