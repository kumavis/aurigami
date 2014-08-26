var PostAddChildPostIdString = function () {
  this.up = function (next) {
    this.addColumn('post', 'childPostId', 'string',  function(err, data){
      if(err){
        throw err;
      }else{

        next();
      }
    });
  };

  this.down = function (next) {
    this.removeColumn('post', 'childPostId', function(err, data){
      if(err){
        throw err;
      }else{
        next();
      }
    }); 
  };
};

exports.PostAddChildPostIdString = PostAddChildPostIdString;
