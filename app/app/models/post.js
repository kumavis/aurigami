var Post = function () {

  this.defineProperties({
    filename: {type:'string'},
    authorName: {type:'string'}
  });

  this.belongsTo('Post');
  this.hasMany('Posts');

};

exports.Post = Post;

