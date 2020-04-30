#!/bin/bash

# Check if yarn is installed on your system.
if ! [ -x "$(command -v yarn)" ]; then
  echo 'Error: yarn is not installed. Please install yarn globally to execute this script.' >&2
  exit 1
fi

echo "Removing old gent_base 'build' directory...";
rm -rf ../build;

echo "Recreating gent_base 'build' directory...";
mkdir ../build;

echo "Building gent_base...";
cd ../source;
yarn install;
mkdir -p ../build/@digipolis-gent/modal;
cp -R ./node_modules/@digipolis-gent/modal/dist/index.js ../build/@digipolis-gent/modal;
cp -R ./node_modules/gent_styleguide/build/styleguide ../build;
./node_modules/.bin/gulp build;
