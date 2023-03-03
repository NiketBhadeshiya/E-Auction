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
        type : String, 
        required : true
    },

    productDescription : {
        type : String,
        required : true
    },

    isReviewed : {
        type : String,
        default : 'No'
    },

    approvedByAdmin : {
        type: String,
        default : 'Requested'
    }
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;