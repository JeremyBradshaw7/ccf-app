# ccfapp

## Overview

This is the mobile app for the Coach Competencies Framework.

## Repository structure

TBD

## Environment set up

Development Pre-requisites:
- ssh key on your mac linked to github account
- xcode (via app store) - follow instructions here (https://facebook.github.io/react-native/docs/getting-started.html) for Building Projects with Native Code + Development OS macOS + Target OS iOS (including adding command line tools). 
- android studio - https://developer.android.com/studio/index.html - follow instructions here (https://facebook.github.io/react-native/docs/getting-started.html) for Building Projects with Native Code + Development OS macOS + Target OS Android. It is recommended to create an emulator for Nexus 6P on Marshmallow (API 23).
- homebrew : `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)`
- node : `brew install node` or via http://nodejs.org/
- watchman : `brew install watchman`
- react native CLI : `npm install -g react-native-cli` - if you get EACCES permission denied errors, run `sudo chown -R $USER ~/.npm` and `sudo chown -R $USER /usr/local/lib/node_modules` then retry
- JDK - http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- Visual Studio Code (recommended IDE, with TSLINT and react-native tools extensions) - https://code.visualstudio.com/

## Developing against device or emulator

Clone this repository, cd into the folder, and install the development pre-requisites:

`npm install`
  
You can pre-start an emulator via xcode or android studio. If no emulator is running then the default ios simulator will be automatically started. An Android simulator can also be pre-started without android studio via the command `npm run emu` (assuming a Nexus_6P_API_23 avd is created).
  
To run on ios:

`npm run ios`

To run on android

`npm run android`

To run on a physical device attached via cable, see the additional instructions here: https://facebook.github.io/react-native/docs/running-on-device.html

## Running Tests

TBD

## Generating an icon & splash screen

Using `generator-rn-toolbox`, see https://github.com/bamlab/generator-rn-toolbox/tree/master/generators/assets#generate-splashscreens :

```
yo rn-toolbox:assets --icon icon-ios.png --ios
yo rn-toolbox:assets --splash splash.png --ios

yo rn-toolbox:assets --icon icon-android.png --android
yo rn-toolbox:assets --splash splash.png --android
yo rn-toolbox:assets --android-notification-icon icon-android.png
```

After setting the splash screen for android it is necessary to reset the background color in ./android/app/src/main/res/values/colors.xml by putting the hexacode #FFFFFF in instead of rgb(0,0,0).
