const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DaySchema = new Schema({
  date : {
    type : String,
    required : true
  },
  activity: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }]
});

var Day = mongoose.model('Day', DaySchema);

module.exports = Day;
