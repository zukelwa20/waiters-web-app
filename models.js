const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.connect(mongoUrl, function(err, results) {
    if(err){
      console.log(err);
    }
    else{
      console.log("connected to database")
    }
    });


    var waiterDays = mongoose.model('waitersDays', {
        name: String,
        days: Object


    });


    return {
      waiterDays
    }
}
