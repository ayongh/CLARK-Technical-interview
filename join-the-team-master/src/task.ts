var mongoose  = require("mongoose")

var Schema = mongoose.Schema

var taskSchema  = new Schema({
  text: String,
  completed: Boolean
})

var task = mongoose.model('task', taskSchema)

module.exports = task;