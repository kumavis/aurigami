var passport = require('./secrets');

var config = {
  appName: 'Geddy App (development)'
, detailedErrors: true
, debug: true
, watch: {
    files : [
      '/config'
    , '/lib'
    , '/app/controllers'
    , '/app/models'
    , '/app/views'
    , '/app/helpers'
    ]
  , includePattern: '\\.(js|coffee|css|less|scss)$'
  , excludePattern: '\\.git|node_modules'
  }
, hostname: null
, port: 5000
, model: {
    defaultAdapter: 'postgres'
  }
, db: {
  postgresql: {
      port:5432,
      database:'aurigami',
      host:'127.0.0.1',
      user:'postgres'
    }
  }
, sessions: {
    store: 'filesystem'
  , filename: '_session_store.json'
  , key: 'sid'
  , expiry: 14 * 24 * 60 * 60
  },
  passport: passport
};

module.exports = config;
