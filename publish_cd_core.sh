#!/bin/bash
# cd "~/nazoxTest/cd-ui-lib"
clear
ng build core
cd "./dist/core/"
npm publish --access=public
cd "../.."

