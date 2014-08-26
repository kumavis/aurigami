var PostRemovePostIdString = function () {
  this.up = function (next) {
    this.removeColumn('post', 'postId', function(err, data){
      if(err){
        throw err;
      }else{
        next();
      }
    }); 
  };

  this.down = function (next) {
    this.addColumn('post', 'postId', 'string',  function(err, data){
      if(err){
        throw err;
      }else{

        next();
      }
    });
  };
};

exports.PostRemovePostIdString = PostRemovePostIdString;
