var Post = function () {

  this.defineProperties({
    filename: {type:'string'},
    authorName: {type:'string'}
  });

  this.belongsTo('Post');
  this.hasMany('Posts');

};

/*
// Can also define them on the prototype
Post.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Post.someStaticMethod = function () {
  // Do some other stuff
};
Post.someStaticProperty = 'YYZ';
*/

exports.Post = Post;

