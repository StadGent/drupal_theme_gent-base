#!/bin/bash

echo "Installing Gent Basetheme...";
cd ../source;
yarn install;

echo "Removing old gent_base 'build' directory...";
rm -rf ../build;

echo "Building the Gent basetheme...";
mkdir ../build && mkdir ../build/js;
gulp build;

echo "Building the style guide...";
cd ../styleguide;
yarn install;
gulp build;

cd scripts;
sh ./postinstall.sh;

echo "Creating main_cli.scss...";
gulp styles:inject;
