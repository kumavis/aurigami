var assert = require('assert')
  , tests
  , async = require('async')
  , Post = geddy.model.Post;

tests = {


  'before': function (next) {
    cleanup(next);
  }


, 'after': function (next) {
    cleanup(next);
  }

, 'simple test if the model saves without a error': function (next) {
    var post = Post.create({});
    post.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'Check if relating posts works': function (next) {

  var first = Post.create();
  first.save(function(err, first){
    if (err) throw err;

    var second = Post.create();
    second.setPost(first);

    console.log("Parallel saving");
    second.save(function(err, second){
      if (err) throw err;
      first.save(function (err, first){
        if (err) throw err;

        console.log(first);
        console.log(second);

        assert( second.postId === first.id, 'Parent was assigned');

        Post.all({}, {includes:['posts']}, function (err, posts){
          if (err) throw err;
          console.log(posts);
          assert(posts.length > 0, 'Both posts are returned');
          next();
        });
      });
    });
  });
}

};

function cleanup (callback) {
  Post.all({}, function (err, posts){
    if (err) throw err;

    var ids = posts.map(function(p){return p.id;});
    Post.remove({id:ids}, callback);
  });
}

module.exports = tests;
