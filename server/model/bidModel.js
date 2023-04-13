const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    productId : {
        type : mongoose.Types.ObjectId,
        ref : 'Product',
        required : true
    },
    bidderId : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    sellerId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    },
    bidAmount : {
        type : Number,
        required : true
    }
});

const Bid = mongoose.model("Bid", bidSchema);

module.exports = Bid;