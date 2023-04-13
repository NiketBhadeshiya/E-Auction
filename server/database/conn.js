const mongoose = require('mongoose');

var connectDB = async() => {
    try {
        var con = await mongoose.connect('mongodb://127.0.0.1/eAuction', {
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
        console.log(`MONGODB Connected : ${con.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;