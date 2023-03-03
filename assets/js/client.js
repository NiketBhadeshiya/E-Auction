const socket = io();


var userid = document.querySelector('#userid').value;
var sellerid = document.querySelector('#sellerid').value;
var productid = document.querySelector('#productid').value;
const btn = document.querySelector('#bidSubmitBtn');
const bidAmount = document.querySelector('#submitBid');
const countdown = document.querySelector('#countDown');
const currentBid = document.querySelector('#currentBid');


function startTimer(){
    var finishtime  = new Date();
    // finishtime.setHours(required_time[0]);
    // finishtime.setMinutes(required_time[1]);
    // finishtime.setSeconds(00);
    finishtime.setSeconds(finishtime.getSeconds() + 60);
    document.getElementById('demo').innerHTML = finishtime;
    finishtime = finishtime.getTime();

    var x = setInterval(function(){
        var now = new Date().getTime();
        var count = finishtime - now;
        console.log(count);

        let data = {
            days : Math.floor(count / (1000 * 60 * 60 * 24)),
            hours : Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes : Math.floor((count % (1000 * 60 * 60)) / (1000 * 60)),
            seconds : Math.floor((count % (1000 * 60)) / (1000))
        }
        socket.emit('display-countdown-server', data);
        if(count < 0){
            clearInterval(x);
            socket.emit('bid-complete');
        }
    },1000);
};

// socket.emit('new-user-joined');

// function appendBid(data){
//     var updatedata = axios.put(`http://localhost/api/product/bid?productId=${data.prodcut}&bidderId=${data.user}&bidAmount=${data.bid}`)
//                             .then((res)=>{
//                                 console.log(`${data} updated successfully`);
//                             })
//                             .catch((err)=>{
//                                 console.log(err);
//                             });
// }

btn.addEventListener('click', () => {
    let data = {
        user : userid,
        bid : bidAmount.value,
        product : productid
    };
    let oldbid = Number(currentBid.innerHTML);
    console.log(bidAmount.value > oldbid);

    if(bidAmount.value != '' && bidAmount.value > oldbid){
        // appendBid(data);
        socket.emit('new-bid',data);
        currentBid.innerHTML = bidAmount.value;
        // bidAmount.value = Number(bidAmount.value) + 1 ;
    } else {
        alert("bid should be greater than current Bid...!!");
    }
    
});

socket.on('receive-bid',data => {
    currentBid.innerHTML = data.bid;
});

socket.on('display-countdown', data => {
    countdown.innerHTML = data.days + "d " + data.hours + "h " + data.minutes + "m " + data.seconds + "s";  
})

socket.on('remove-btn', () => {
    countdown.innerHTML = "SESSION EXPIRED...";
    btn.style.display = 'none';
});
