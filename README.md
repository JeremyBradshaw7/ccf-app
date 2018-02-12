# ccf-app

## Overview

This is the mobile app for the Coach Competencies Framework.

## Repository structure

TBD

## Environment set up

Pre-requisites:
- ssh key on your mac linked to github account
- xcode
- android studio
- node
- homebrew : `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)`
- watchman : `brew install watchman`
- react native CLI : `npm install -g react-native-cli` - if you get EACCES permission denied errors, run `- sudo chown -R $USER ~/.npm` and `- sudo chown -R $USER /usr/local/lib/node_modules` then retry
- JDK - http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- Visual Studio Code (recommended IDE, with TSLINT and react-native tools extensions)

## Developing against device or emulator

Clone this repository and install the development pre-requisites:

  $ npm install
  
Either connect a real ios/android device via a cable, or start an emulator via xcode or android studio respectively. If no device or emulator is running then the default ios simulator will be automatically started. An Android simulator can also be pre-started without android studio via the command `npm run emu` (assuming a Nexus_6P_API_23 avd is created):
  
To run on ios:

  $ npm run ios

To run on android

  $ npm run android

## Running Tests

TBD

