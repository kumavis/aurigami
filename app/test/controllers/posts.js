var assert = require('assert')
  , tests
  , async = require('async')
  , request = require('request')
  , url = 'http://localhost:5000'
  , controller = geddy.controller.create('Posts');

tests = {

  'before': function (next) {

    var tasks = [];
    for(var i = 0; i < 10; i++){
      var opts = {
        filename: i,
        authorname: i
      };
      var Post = geddy.model.Post;
      var post = Post.create(opts);

      tasks.push(post.save.bind(post));
    }

    async.parallel(tasks, next);
  }

};

module.exports = tests;
