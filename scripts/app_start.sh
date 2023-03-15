#!/bin/bash
cd /home/ec2-user/frontend/src
sudo npm run start
pm2 start npm --name "DietTracker" -- start
pm2 startup
pm2 save
pm2 restart all
