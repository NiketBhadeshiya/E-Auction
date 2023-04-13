const socket = io();


var userid = document.querySelector('#userid').value;
var sellerid = document.querySelector('#sellerid').value;
var productid = document.querySelector('#productid').value;
const btn = document.querySelector('#bidSubmitBtn');
const bidAmount = document.querySelector('#submitBid');
const countdown = document.querySelector('#countDown');
const currentBid = document.querySelector('#currentBid');
const bidTime = document.querySelector('#bidTime');

btn.style.display = "none";

function startTimer(){
    var finishtime  = new Date();
    btn.style.display = "inline-block";
    // finishtime.setHours(required_time[0]);
    // finishtime.setMinutes(required_time[1]);
    // finishtime.setSeconds(00);
    if(bidTime.value <= 1440){
        finishtime.setMinutes(finishtime.getMinutes() + Number(bidTime.value));
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
    } else {
        alert("It Should be less than 1440");
        return false;
    }
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
    var data = {
        user : userid,
        bid : bidAmount.value,
        product : productid,
        seller : sellerid
    };
    let oldbid = Number(currentBid.innerHTML);
    console.log(bidAmount.value > oldbid);

    if(bidAmount.value != '' && bidAmount.value > oldbid){
        // appendBid(data);
        socket.emit('new-bid', data);
        currentBid.innerHTML = bidAmount.value;
        // bidAmount.value = Number(bidAmount.value) + 1 ;
    } else {
        alert("bid should be greater than current Bid...!!");
    }
    
});

socket.on('receive-bid', data => {
    currentBid.innerHTML = data.bid;
});

socket.on('display-countdown', data => {
    btn.style.display = "inline-block";
    countdown.innerHTML = data.days + "d " + data.hours + "h " + data.minutes + "m " + data.seconds + "s";  
})

socket.on('remove-btn', (user) => {
    console.log("User  : " + user);
    countdown.innerHTML = "SESSION EXPIRED...";
    btn.style.display = 'none';
    alert(`${user.name.firstName} ${user.name.lastName} wins the Bid..`);
});
