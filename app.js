const express = require('express');
const path = require('path');
const app = new express();
const server = require('http').createServer(app);
const bodyparser = require('body-parser');
const io = require("socket.io")(server);
const axios = require('axios');

const connectDB = require('./server/database/conn');

connectDB();

app.use(express.urlencoded({ extended : true }));
app.use(express.json());

//EJS specific stuff
app.set('view engine', 'ejs');         //set the template engine as ejs
app.set('views', path.join(__dirname, 'views'));    //set the views directory

//Express specific stuff & for serving static files
app.use('/static', express.static(path.resolve(__dirname, 'static')));   
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));
app.use('/public', express.static(path.resolve(__dirname, "public")));

app.use('/', require('./server/routes/route'));
app.use('/admin', require('./server/routes/adminRoute'));
// { params : { productId : data.product, bidderId : data.user ,bidAmount : data.bid}}

async function updatedata(data) {
    try {
        console.log(data.product , " ", data.user , " ", data.bid);
        let updatedata = await axios.put(`http://localhost/api/product/bid?productId=${data.product}&bidderId=${data.user}&bidAmount=${data.bid}`);
        // console.log(updatedata);
    } catch (error) {
        console.log(error);
    }
}


io.on('connection', (socket) => {
    socket.on('new-user-joined', () => {
        console.log("New user joined..");
    });

    socket.on('new-bid', (data) => {
        updatedata(data);
        io.emit('receive-bid', data);
    });

    socket.on('bid-complete', () => {
        io.emit('remove-btn');
    });

    socket.on('display-countdown-server', data => {
        io.emit('display-countdown',data);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected..");
    })
});


server.listen(80, () => {
    console.log(`the application started successfully on port http://localhost`);
});