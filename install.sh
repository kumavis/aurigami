#! /bin/bash

# API Installation
cd app
npm i -g geddy
npm i

# API Secret initialization
echo "{}" >> ./config/secrets.json
geddy gen secret

# API DB Initialization
geddy jake db:init
geddy jake db:migrate

# Sound Server Initialization
cd ../sound_server
npm i
cd ..

