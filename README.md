# Aurigami

### An audio-forum based on Herddit based on Reddit based on Conversation.

## Setup

### API Server Setup

The API Server requires a Postgres server running on port `5432` (the default) with a `postgres` user with full permissions and no password.  This can be configured in `app/config/development`.

You will need `Geddy` installed globally (`npm i -g geddy`).

You will then need to install dependencies, and initialize and migrate your database:
```
cd aurigami/app
npm i
geddy jake db:init
geddy jake db:migrate

```
From there you can start your app from the `aurigami/app` folder using the `geddy` command.

### Media Server Setup

This part @kumavis did, and he should fill in those details here.
