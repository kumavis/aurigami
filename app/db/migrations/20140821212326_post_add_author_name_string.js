var PostAddAuthorNameString = function () {
  this.up = function (next) {
    this.addColumn('post', 'authorName', 'string',  function(err, data){
      if(err){
        throw err;
      }else{

        next();
      }
    });
  };

  this.down = function (next) {
    this.removeColumn('post', 'authorName', function(err, data){
      if(err){
        throw err;
      }else{
        next();
      }
    }); 
  };
};

exports.PostAddAuthorNameString = PostAddAuthorNameString;
