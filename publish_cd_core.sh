# cd "~/nazoxTest/cd-ui-lib"
clear
sh updateVersionRevision.sh
ng build core
cd "./dist/core/"
npm publish --access=public
cd "../.."

