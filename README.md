# Aurigami

### An audio-forum based on Herddit based on Reddit based on Conversation.

## Setup

Install Node.js and Postgres.

###### A Postgres Database
* a Postgres server running on port `5432` (the default)
* with a database `aurigami`
* with full permissions and no password for user `postgres`

This can be configured in `app/config/development`.
Use the following commands to setup the database and user:
```
create USER postgres;
create DATABASE aurigami WITH OWNER postgres;
```

### API Server Setup

###### Automatic Installation

You can automatically install all the application depednencies by running `./setup.sh` in the main folder.

###### Manual Installation

You will need `Geddy` installed globally (`npm i -g geddy`).

You will then need to install dependencies, and initialize and migrate your database:
```
cd app
npm i
geddy jake db:init
geddy jake db:migrate
```
From there you can start your app from the `aurigami/app` folder using the `geddy` command.

###### Configuration

You will need a copy of the secrets config file in `app/config/secrets.json`.

Something like:

```json
{
  "passport": {
    "successRedirect": "/",
    "failureRedirect": "/login",
    "twitter": {
      "consumerKey": "XXXXX",
      "consumerSecret": "XXXXX"
    },
    "facebook": {
      "clientID": "XXXXX",
      "clientSecret": "XXXXX"
    },
    "yammer": {
      "clientID": "XXXXX",
      "clientSecret": "XXXXX"
    }
  },
  "secret": "XXXXX"
}
```

You can populate an empty (`{}`) json `config/secrets.json` file by running `geddy gen secret`.

### Media Server Setup

The Media Server handles the recording service and the playback server.

###### App Dependencies

You will then need to install dependencies.
```
cd sound_server
npm i
```
Then start the app with `npm start`.

