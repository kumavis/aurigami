# Aurigami

### An audio-forum based on Herddit based on Reddit based on Conversation.

## Setup

### API Server Setup

The API Server requires:

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

###### App Dependencies
You will need `Geddy` installed globally (`npm i -g geddy`).

You will then need to install dependencies, and initialize and migrate your database:
```
cd app
npm i
geddy jake db:init
geddy jake db:migrate
```
From there you can start your app from the `aurigami/app` folder using the `geddy` command.

### Media Server Setup

The Media Server handles the recording service and the playback server.

###### App Dependencies

You will then need to install dependencies.
```
cd sound_server
npm i
```
Then start the app with `npm start`.