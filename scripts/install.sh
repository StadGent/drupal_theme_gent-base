#!/bin/bash

NPM_COMMAND=(npm install)

# Check if npm is installed on your system.
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed. Please install npm globally to execute this script.' >&2
  exit 1
fi

# Check if nvm is available
if ! [ -x "$(command -v nvm)" ]; then
  if [ -f ~/.nvm/nvm.sh ]; then
    . ~/.nvm/nvm.sh;
    NPM_COMMAND=(nvm exec npm install);
  fi
else
  NPM_COMMAND=(nvm exec npm install);
fi

echo "Removing old gent_base 'build' directory...";
rm -rf ../build;

echo "Recreating gent_base 'build' directory...";
mkdir ../build;

echo "Building gent_base...";
cd ../source;
"${NPM_COMMAND[@]}"
mkdir -p ../build/@digipolis-gent/modal;
cp -R ./node_modules/@digipolis-gent/modal/dist/index.js ../build/@digipolis-gent/modal;
cp -R ./node_modules/gent_styleguide/build/styleguide ../build;
./node_modules/.bin/gulp build;
