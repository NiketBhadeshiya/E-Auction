const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },

    productName : {
        type : String,
        required : true
    },

    startPrice : {
        type : Number,
        required : true
    },
 
    productImage : {
        type : String
    },

    odometer : {
        type : String
    },

    engine : {
        type : String
    },

    noOfOwner : {
        type : String
    },
    
    colour : {
        type : String
    },

    registrationNo : {
        type : String
    },

    damage : {
        type : String
    },

    accident : {
        type : String
    },

    model : {
        type : String
    },

    manufacturer : {
        type : String
    },

    year : {
        type : String
    },

    month : {
        type : String
    },

    fuel : {
        type : String
    },

    isReviewed : {
        type : String,
        default : 'No'
    },

    approvedByAdmin : {
        type : String,
        default : 'Requested'
    },

    isBidded : {
        type : String,
        default : 'No'
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;