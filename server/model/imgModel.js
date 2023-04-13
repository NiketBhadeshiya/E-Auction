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
    },
    mimeType : {
        type : String
    },
    path: {
        type : String
    }
})

const IMG = mongoose.model("IMG", imgSchema);

module.exports = IMG ; 