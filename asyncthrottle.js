module.exports = function (options) {
  var action = options.action
    , callback = options.callback
    , max = options.max
    , tick = options.tick
    , onTick = options.onTick
    , left = max
    , limit = options.limit
    , done = 0
    , quit = false
    ;

  function doIt() {
    if(left <= 0) return;
    --left;
    action(function(err, data) {
        done ++;
        if(err) {
          if(callback) {
            callback(err);
            callback = null;
            quit = true;
          }
        }
        if(onTick && done % tick == 0) {
          onTick(done);
        }
        if(done == max) {
          callback(done);
        }
        if(!quit) process.nextTick(doIt);
    });
  }

  for(var i = 0; i < limit; i++) {
    doIt();
  }
}
