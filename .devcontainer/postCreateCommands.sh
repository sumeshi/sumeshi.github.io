#!/bin/sh

# change npm default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# install dependency checker
npm install -g npm-check-updates

# prepare project
npm install
echo 'Welcome to the sumeshi.github.io development environment!'