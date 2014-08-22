var PostAddFilenameString = function () {
  this.up = function (next) {
    this.addColumn('post', 'filename', 'string',  function(err, data){
      if(err){
        throw err;
      }else{

        next();
      }
    });
  };

  this.down = function (next) {
    this.removeColumn('post', 'filename', function(err, data){
      if(err){
        throw err;
      }else{
        next();
      }
    }); 
  };
};

exports.PostAddFilenameString = PostAddFilenameString;
