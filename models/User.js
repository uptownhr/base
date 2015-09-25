const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, unique:true},
  password: {type: String, required: true}
})

userSchema.methods.comparePassword = function(password){
  return this.password == password
}

module.exports = mongoose.model("User", userSchema)