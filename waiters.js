module.exports = function(models) {
    const showForm = function(req, res, next) {
        res.render('home')
    }

    var monday = [];
    var tuesday = [];
    var wednesday = [];
    var thursday = [];
    var friday = [];
    var saturday = [];
    var sunday = [];

  const colorFun = function(color){
    if(color === 3){
      return "color3";
    }
    if(color < 3){
      return "color2";
    }
    if(color > 3){
      return "color1";
    }
  }

   const waiter = function(req, res, next) {
        var username = req.params.username;
        var days = req.body.daysName;
        console.log(days);

        models.waiterDays.findOne({
            name: username
        }, function(err, result) {
            if (err) {
                return next(err)
            } else {
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
                }, function(err, result) {
                    if (err) {
                        return next(err)
                    }
                    console.log("name added");
                    res.render('wait', result)
                })

            }

        })
    }


    const waiterFun = function(req, res) {
        var username = req.params.username;
        var days = req.body.daysName;

        var daySelected = {};

        if (!Array.isArray(days)) {
            days = [days]
        }
        days.forEach(function(weekdays) {
            daySelected[weekdays] = true
        })

        models.waiterDays.findOneAndUpdate({
            name: username
        }, {
            days: daySelected
        }, function(err, results) {
            if (err) {
                console.log(err);
            }
            res.render('wait')

        })
    }

  const adminFunction = function(req, res) {
   models.waiterDays.find({}, function(err, resultsFromDataBase) {
            if (err) {
                console.log(err);
            }
            var monday = [];
            var tuesday = [];
            var wednesday = [];
            var thursday = [];
            var friday = [];
            var saturday = [];
            var sunday = [];
// console.log(resultsFromDataBase);

            resultsFromDataBase.forEach(function(day) {
                var Days = day.days
                var waiterName = day.name

                if (typeof(Days) == 'object') {

                    var shift = Object.keys(Days); //['monday', 'tuesday']
                    shift.forEach(function(daysPerWaiter) {
                        if (daysPerWaiter == 'monday') {
                            monday.push(waiterName)
                        }
                        if (daysPerWaiter == 'tuesday') {
                            tuesday.push(waiterName)
                            //console.log(tuesday)
                        }
                        if (daysPerWaiter == 'wednesday') {
                            wednesday.push(waiterName)
                        }
                        if (daysPerWaiter == 'thursday') {
                            thursday.push(waiterName)
                        }
                        if (daysPerWaiter == 'friday') {
                            friday.push(waiterName)
                        }
                        if (daysPerWaiter == 'saturday') {
                            saturday.push(waiterName)
                        }
                        if (daysPerWaiter == 'sunday') {
                            sunday.push(waiterName)
                        }
                    })
                }
                // console.log(Object.keys(day.days))
            })

            res.render('admin', {
                mon: monday,
                colorChange: colorFun(monday.length),
                tues: tuesday,
                colorT: colorFun(tuesday.length),
                wen: wednesday,
                colorWed: colorFun(wednesday.length),
                thurs: thursday,
                colorThur: colorFun(thursday.length),
                fri: friday,
                colorFri: colorFun(friday.length),
                sat: saturday,
                colorSat: colorFun(saturday.length),
                sun: sunday,
                colorSun: colorFun(sunday.length)
            })
        })

    }

    var resetData = function(req, res){
      models.waiterDays.remove({}, function(err, resetResults){
        if(err){
          console.log(err);
        }
        else{
          return resetResults
        }
      })
    }

    return {
        showForm,
        waiter,
        waiterFun,
        adminFunction,
        resetData
    }
}
