const mongoose = require('mongoose');

const imgSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    productImage : {
        type : String,
        required : true
    }
})