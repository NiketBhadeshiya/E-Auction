const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true 
    },
    password : {
        type : String,
        required : true
    },
    name : {
        firstName : {
            type : String
        },
        lastName :{
            type : String
        }
    },
    contactNo: {
        type: String
    },
    address: {
        buildingNo: {
            type: String
        },
        buildingName: {
            type: String
        },
        landmark: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pincode: {
            type: String
        }
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;