#!/bin/sh

# This is used for PM2, Production Mode

cd;

cd TicTac.io;

fuser -k 3000/tcp

sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

npm run build;

npm start;