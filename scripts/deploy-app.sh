#!/usr/bin/env bash

cd Users/adomi/Desktop/thesis/development/connect-panserraikos-front
ng build --prod

ssh -t user@snf-874840.vm.okeanos.grnet.gr "sudo rm -rfv /var/www/html/*"

echo ======= UPLOADING dist folder =======
echo .....
sshpass -p FaQzB13rWD scp -r dist/connect-panserraikos/* user@snf-874840.vm.okeanos.grnet.gr:/var/www/html
echo ----- UPLOADING FINISHED -----
echo .....
echo ----- LOGGING IN TO SERVER -----
ssh -t user@snf-874840.vm.okeanos.grnet.gr "sudo systemctl restart nginx"
echo ----- APP SUCCESFULLY DEPLOYED -----
