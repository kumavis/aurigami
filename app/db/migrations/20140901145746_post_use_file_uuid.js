var PostUseFileUuid = function () {
  this.up = function (next) {
    // ALTER TABLE distributors RENAME COLUMN address TO city;
    this.renameColumn('post', 'filename', 'audioUuid', function (err, data) {
      if(err){
        throw err;
      }else{
        next();
      }
    });
  };

  this.down = function (next) {
    this.renameColumn('post', 'audioUuid', 'filename', function (err, data) {
      if(err){
        throw err;
      }else{
        next();
      }
    });
  };
};

exports.PostUseFileUuid = PostUseFileUuid;
