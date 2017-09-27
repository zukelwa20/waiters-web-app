module.exports = function(models) {
    const showForm = function(req, res, next) {
        res.render('home')
      }


    const waiter = function(req, res, next){
var username = req.params.username;
var days = req.body.daysName;
console.log(days);

models.waiterDays.findOne({
  name: username
}, function(err, result){
if (err) {
return next(err)
}else{
  if (result) {
    console.log("name already added");
    var data = {
      name: result.name,
      days: result.days
    }
    res.render('wait', data)
}
}
if (!result) {
  models.waiterDays.create({
    name: username
  }, function(err, result){
    if (err) {
      return next(err)
    }
    console.log("name added");
    res.render('wait', result)
  })

}

})
}



const waiterFun = function(req,res) {
  var username = req.params.username;
  var days = req.body.daysName;

  var daySelected = {};

  if(!Array.isArray(days)){
    days=[days]
  }
  days.forEach(function(weekdays){
    daySelected[weekdays] = true
  })

  models.waiterDays.findOneAndUpdate({name:username}, {days:daySelected}, function(err, results){
    if(err){
      console.log(err);
    }
  res.render('wait')

  })
}



    return {
      showForm,
      waiter,
      waiterFun
    }
  }
