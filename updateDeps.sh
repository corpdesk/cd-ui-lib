## cd to cd-ui-lib directory
cd "~/nazoxTest/cd-ui-lib"
## build @corpdesk/core
ng build core
## copy @corpdesk/core to @corpdesk/nav
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/naz-lib/node_modules/@corpdesk/
## cd to naz-lib directory
# cd "~/nazoxTest/naz-lib"
## build @corpdesk/naz
## ng build naz
## copy @corpdesk/core to @corpdesk/nav
echo "...copying @corpdesk/core to ~/nazoxTest/naz-lib/node_modules/@corpdesk/"
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/naz-lib/node_modules/@corpdesk/
## copy @corpdesk/core to cd-moduleman
echo "...copying @corpdesk/core to ~/nazoxTest/cd-moduleman/node_modules/@corpdesk/"
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/cd-moduleman/node_modules/@corpdesk/

## copy @corpdesk/naz to cd-moduleman
echo "...copying @corpdesk/naz to ~/nazoxTest/cd-moduleman/node_modules/@corpdesk/"
cp -R ~/nazoxTest/naz-lib/dist/naz ~/nazoxTest/cd-moduleman/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-shell
echo "...copying @corpdesk/naz to ~/nazoxTest/cd-shell/node_modules/@corpdesk/"
cp -R ~/nazoxTest/naz-lib/dist/naz ~/nazoxTest/cd-shell/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-user
echo "...copying @corpdesk/naz to ~/nazoxTest/cd-user/node_modules/@corpdesk/"
cp -R ~/nazoxTest/naz-lib/dist/naz ~/nazoxTest/cd-user/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-user
echo "...copying @corpdesk/naz to ~/nazoxTest/cd-comm/node_modules/@corpdesk/"
cp -R ~/nazoxTest/naz-lib/dist/naz ~/nazoxTest/cd-comm/node_modules/@corpdesk/
## ###############################################################################
## copy @corpdesk/core to cd-moduleman
echo "...copying @corpdesk/core to ~/nazoxTest/cd-moduleman/node_modules/@corpdesk/"
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/cd-moduleman/node_modules/@corpdesk/
## copy @corpdesk/core to cd-shell
echo "...copying @corpdesk/core to ~/nazoxTest/cd-shell/node_modules/@corpdesk/"
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/cd-shell/node_modules/@corpdesk/
## copy @corpdesk/core to cd-user
echo "...copying @corpdesk/core to ~/nazoxTest/cd-user/node_modules/@corpdesk/"
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/cd-user/node_modules/@corpdesk/
## copy @corpdesk/core to cd-user
echo "...copying @corpdesk/core to ~/nazoxTest/cd-comm/node_modules/@corpdesk/"
cp -R ~/nazoxTest/cd-ui-lib/dist/core ~/nazoxTest/cd-comm/node_modules/@corpdesk/

## cd to cd-moduleman directory
# cd "~/nazoxTest/cd-moduleman"
## build cd-moduleman
# ng build
