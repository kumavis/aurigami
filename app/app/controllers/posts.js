var async = require('async');

var Posts = function () {
  this.respondsWith = ['html', 'json'];

  this.index = function (req, resp, params) {
    var _this = this;
    var Post = geddy.model.Post;

    Post.all({}, {limit:50, sort:{ createdAt: 'desc'}}, function(err, posts) {
      if (err) {
        throw err;
      }
      _this.respondWith(posts, {type:'Post'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    if (!params.post) throw new geddy.errors.BadRequestError("Include a post object!");

    var _this = this;
    var Post = geddy.model.Post;
    var post = Post.create(opts);

    // A root post (no parent)
    if(!opts.post){

      post.save(function(err, post){
        if (err) throw err;
        _this.respond(post);
      });

    // A reply post
    } else {

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

    Post.all({or:[{id:params.id}, {childPostId:params.id}]}, function (err, posts){
      if (err) throw err;

      _this.respondWith(posts);
    });
  };

  this.edit = function (req, resp, params) {
    var _this = this;
    var Post = geddy.model.Post;

    Post.first(params.id, function(err, post) {
      if (err) {
        throw err;
      }
      if (!post) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        _this.respondWith(post);
      }
    });
  };

  this.update = function (req, resp, params) {
    var _this = this;
    var Post = geddy.model.Post;

    Post.first(params.id, function(err, post) {
      if (err) {
        throw err;
      }
      post.updateProperties(params);

      if (!post.isValid()) {
        _this.respondWith(post);
      } else {
        // Save the resource, then display the item page
        post.save(function(err, data) {
          if (err) {
            throw err;
          }
          // _this.respondWith(post, {status: err});
          this.redirect({controller: this.name, id: params.id});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var _this = this;
    var Post = geddy.model.Post;

    Post.first(params.id, function(err, post) {
      if (err) {
        throw err;
      }
      if (!post) {
        throw new geddy.errors.BadRequestError();
      } else {
        Post.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          _this.respondWith(post);
        });
      }
    });
  };

};

exports.Posts = Posts;
