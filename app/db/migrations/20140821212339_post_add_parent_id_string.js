var PostAddParentIdString = function () {
  this.up = function (next) {
    this.addColumn('post', 'parentId', 'string',  function(err, data){
      if(err){
        throw err;
      }else{

        next();
      }
    });
  };

  this.down = function (next) {
    this.removeColumn('post', 'parentId', function(err, data){
      if(err){
        throw err;
      }else{
        next();
      }
    }); 
  };
};

exports.PostAddParentIdString = PostAddParentIdString;
