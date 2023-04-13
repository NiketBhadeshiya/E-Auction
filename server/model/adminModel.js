const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    contactNo : {
        type : String
    },
    address : {
        buildingNo : {
            type : String
        },
        buildingName : {
            type : String
        },
        landmark : {
            type : String
        },
        city : {
            type : String
        },
        state : {
            type : String
        },
        pincode : {
            type : String
        }
    }
});

const Admin = new mongoose.model("Admin", adminSchema);

module.exports = Admin;