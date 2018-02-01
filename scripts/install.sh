#!/bin/bash

# Check if yarn is installed on your system.
if ! [ -x "$(command -v yarn)" ]; then
  echo 'Error: yarn is not installed. Please install yarn globally to execute this script.' >&2
  exit 1
fi

echo "Installing Gent Basetheme...";
cd ../source;
yarn install;

echo "Removing old gent_base 'build' directory...";
rm -rf ../build;

echo "Building the Gent basetheme...";
mkdir ../build && mkdir ../build/js;
./node_modules/.bin/gulp build;

echo "Building the style guide...";
cd ../styleguide;
yarn install;
./node_modules/.bin/gulp build;

cd scripts;
sh ./postinstall.sh;

echo "Creating main_cli.scss...";
cd ../;
./node_modules/.bin/gulp styles:inject;
