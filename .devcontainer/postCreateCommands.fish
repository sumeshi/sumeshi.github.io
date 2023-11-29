#!/usr/bin/fish

# change npm default directory
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'

# install dependency checker
npm install -g npm-check-updates

# prepare project
npm install