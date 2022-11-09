const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    default: null,
    // required:true
  },
  dob: {
    type: String,
    default: null,
    // required:true
  },
  country: {
    type: String,
    default: null,
    // required:true
  },
  resume:{
    type:String,
    default:null
  }
  
});

module.exports = mongoose.model("Posts", UserSchema);
