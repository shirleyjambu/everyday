const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
  time : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : false,
    default : 'NA'
  }
});

const Activity = mongoose.model('Activity', ActivitySchema);

module.exports = Activity;