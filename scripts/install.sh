#!/bin/bash

NPM_COMMAND=(npm install)

# Check if npm is installed on your system.
if ! [ -x "$(command -v npm)" ]; then
  echo 'Error: npm is not installed. Please install npm globally to execute this script.' >&2
  exit 1
fi

# Check if we're on Travis, `nvm use` should be part of the Travis pre-install
# task.
if [ -z "$TRAVIS" ]; then
  # Check if nvm is available
  if ! [ -x "$(command -v nvm)" ]; then
    echo "nvm command not found, trying to load ~/.nvm/nvm.sh.";
    if [ -f ~/.nvm/nvm.sh ]; then
      echo "~/.nvm/nvm.sh found, loading it.";
      . ~/.nvm/nvm.sh;
      NPM_COMMAND=(nvm exec npm install);
    fi
  else
    echo "nvm command found."
    NPM_COMMAND=(nvm exec npm install);
  fi
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
