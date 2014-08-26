var async = require('async');

var Posts = function () {
  this.respondsWith = ['html','json'];

  this.index = function (req, resp, params) {
    var _this = this;
    var Post = geddy.model.Post;

    Post.all({}, {limit:50, sort:{ createdAt: 'desc'}},
      function (err, posts){
      if (err) throw err;

      _this.respond(posts);
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    if (!params.post) throw new geddy.errors.BadRequestError("Include a post object!");

    var opts = params.post;
    var Post = geddy.model.Post;
    var _this = this;

    var post;

    if(!opts.post){
      // An original Post!  Just save it!
      post = Post.create(opts);
      post.save(function(err, post){
        if (err) throw err;
        _this.respond(post);
      });

    } else {
      // A reply post!  Make it and get the original!
      post = Post.create(opts);

      async.parallel([
        post.save.bind(post),
        Post.first.bind(Post, {id:opts.post})
      ], function (err, results){
        if (err) throw err;

        var post = results[0];
        var parent = results[1];

        post.setPost(parent);
        post.save(function(err, post){
          if (err) throw err;
          _this.respond(post);
        });
      });
    }
  };

  this.show = function (req, resp, params) {
    var _this = this;
    var Post = geddy.model.Post;

    Post.all({or:[{id:params.id}, {postId:params.id}]}, function (err, posts){
      if (err) throw err;

      _this.respond(posts);
    });
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

  this.update = function (req, resp, params) {
    // Save the resource, then display the item page
    this.redirect({controller: this.name, id: params.id});
  };

  this.remove = function (req, resp, params) {
    this.respond({params: params});
  };

};

exports.Posts = Posts;

