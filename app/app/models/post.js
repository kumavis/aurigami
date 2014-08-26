var Post = function () {

  this.defineProperties({
    filename: {type:'string'},
    authorName: {type:'string'}
  });

  // This requires a childPostId on the child.
  // This `childPostId` is the parent post's ID.
  //
  // I agree it's a little strange.
  this.hasMany('Children', {model:'Post'});

};

exports.Post = Post;

