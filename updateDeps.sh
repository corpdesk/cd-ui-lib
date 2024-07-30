projDir="$HOME/cd-projects"
## cd to cd-ui-lib directory
cd "$projDir/cd-ui-lib"
## build @corpdesk/core
ng build core
## copy @corpdesk/core to @corpdesk/nav
# cp -R $projDir/cd-ui-lib/dist/core $projDir/naz-lib/node_modules/@corpdesk/
## cd to naz-lib directory
# cd "$projDir/naz-lib"
## build @corpdesk/naz
## ng build naz
## copy @corpdesk/core to @corpdesk/nav
echo "...copying @corpdesk/core to $projDir/naz-lib/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/naz-lib/node_modules/@corpdesk/
## copy @corpdesk/core to cd-moduleman
echo "...copying @corpdesk/core to $projDir/cd-moduleman/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-moduleman/node_modules/@corpdesk/

## copy @corpdesk/naz to cd-moduleman
echo "...copying @corpdesk/naz to $projDir/cd-moduleman/node_modules/@corpdesk/"
cp -R $projDir/naz-lib/dist/naz $projDir/cd-moduleman/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-shell
echo "...copying @corpdesk/naz to $projDir/cd-shell/node_modules/@corpdesk/"
cp -R $projDir/naz-lib/dist/naz $projDir/cd-shell/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-user
echo "...copying @corpdesk/naz to $projDir/cd-user/node_modules/@corpdesk/"
cp -R $projDir/naz-lib/dist/naz $projDir/cd-user/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-user
echo "...copying @corpdesk/naz to $projDir/cd-comm/node_modules/@corpdesk/"
cp -R $projDir/naz-lib/dist/naz $projDir/cd-comm/node_modules/@corpdesk/
## ###############################################################################
## copy @corpdesk/core to cd-moduleman
echo "...copying @corpdesk/core to $projDir/cd-moduleman/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-moduleman/node_modules/@corpdesk/
## copy @corpdesk/core to cd-shell
echo "...copying @corpdesk/core to $projDir/cd-shell/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-shell/node_modules/@corpdesk/
## copy @corpdesk/core to cd-user
echo "...copying @corpdesk/core to $projDir/cd-user/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-user/node_modules/@corpdesk/
## copy @corpdesk/core to cd-user
echo "...copying @corpdesk/core to $projDir/cd-comm/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-comm/node_modules/@corpdesk/
## copy @corpdesk/core to nazoxTest/cd-user
echo "...copying @corpdesk/core to $projDir/cd-user/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-user/node_modules/@corpdesk/
## copy @corpdesk/core to nazoxTest/cd-shell
echo "...copying @corpdesk/core to $projDir/cd-shell/node_modules/@corpdesk/"
cp -R $projDir/cd-ui-lib/dist/core $projDir/cd-shell/node_modules/@corpdesk/
## ngWebSocket
## copy @corpdesk/core to ~/projects/ngWebSocket
# echo "...copying @corpdesk/core to ~/projects/ngWebSocket/node_modules/@corpdesk/"
# cp -R $projDir/cd-ui-lib/dist/core ~/projects/ngWebSocket/node_modules/@corpdesk/

## cd to cd-moduleman directory
# cd "$projDir/cd-moduleman"
## build cd-moduleman
# ng build
