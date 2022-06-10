## cd to cd-ui-lib directory
cd "~/projects/nazoxTest/cd-ui-lib"
## build @corpdesk/core
ng build core
## copy @corpdesk/core to @corpdesk/nav
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/naz-lib/node_modules/@corpdesk/
## cd to naz-lib directory
# cd "~/projects/nazoxTest/naz-lib"
## build @corpdesk/naz
## ng build naz
## copy @corpdesk/core to @corpdesk/nav
echo "...copying @corpdesk/core to ~/projects/nazoxTest/naz-lib/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/naz-lib/node_modules/@corpdesk/
## copy @corpdesk/core to cd-moduleman
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-moduleman/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-moduleman/node_modules/@corpdesk/

## copy @corpdesk/naz to cd-moduleman
echo "...copying @corpdesk/naz to ~/projects/nazoxTest/cd-moduleman/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/naz-lib/dist/naz ~/projects/nazoxTest/cd-moduleman/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-shell
echo "...copying @corpdesk/naz to ~/projects/nazoxTest/cd-shell/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/naz-lib/dist/naz ~/projects/nazoxTest/cd-shell/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-user
echo "...copying @corpdesk/naz to ~/projects/nazoxTest/cd-user/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/naz-lib/dist/naz ~/projects/nazoxTest/cd-user/node_modules/@corpdesk/
## copy @corpdesk/naz to cd-user
echo "...copying @corpdesk/naz to ~/projects/nazoxTest/cd-comm/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/naz-lib/dist/naz ~/projects/nazoxTest/cd-comm/node_modules/@corpdesk/
## ###############################################################################
## copy @corpdesk/core to cd-moduleman
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-moduleman/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-moduleman/node_modules/@corpdesk/
## copy @corpdesk/core to cd-shell
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-shell/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-shell/node_modules/@corpdesk/
## copy @corpdesk/core to cd-user
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-user/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-user/node_modules/@corpdesk/
## copy @corpdesk/core to cd-user
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-comm/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-comm/node_modules/@corpdesk/
## copy @corpdesk/core to nazoxTest/cd-user
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-user/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-user/node_modules/@corpdesk/
## copy @corpdesk/core to nazoxTest/cd-shell
echo "...copying @corpdesk/core to ~/projects/nazoxTest/cd-shell/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/nazoxTest/cd-shell/node_modules/@corpdesk/
## ngWebSocket
## copy @corpdesk/core to ~/projects/ngWebSocket
echo "...copying @corpdesk/core to ~/projects/ngWebSocket/node_modules/@corpdesk/"
cp -R ~/projects/nazoxTest/cd-ui-lib/dist/core ~/projects/ngWebSocket/node_modules/@corpdesk/

## cd to cd-moduleman directory
# cd "~/projects/nazoxTest/cd-moduleman"
## build cd-moduleman
# ng build
