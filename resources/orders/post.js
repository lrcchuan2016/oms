cancelUnless(me, "You must be logged in to do this.", 401);

var _this = this;

dpd.counters.post('orderid', {seq: {$inc: 1}}, function(res, err) {
  if(err) return console.log(err);
  _this.ordId = res.seq;
  emit('orderAdded', _this);
});