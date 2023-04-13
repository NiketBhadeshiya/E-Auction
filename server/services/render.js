const axios = require('axios');

exports.homeRoutes = (req,res) => {
    res.render('index' ,{login:false, admin:false , message : ""}); 
}

exports.logedin_home = async(req, res) => {
    const userdata = await axios.get(`http://localhost/api/users?userName=${req.body.userName}`);
    console.log(userdata.data);
    if(userdata.data.length != 0 &&  userdata.data[0].password == req.body.password){
        // console.log(userdata.data);
        const productdata = await axios.get(`http://localhost/api/products/${userdata.data[0]._id}`);
        const allproductdata = await axios.get(`http://localhost/api/products`);    
        const bidProduct = await axios.get(`http://localhost/api/product/bid?bidderId=${userdata.data[0]._id}`);
        const bidProductSeller = await axios.get(`http://localhost/api/product/bid?sellerId=${userdata.data[0]._id}`);

        // const imgs = await axios.get(`http://localhost/api/products-imgs`);
        res.render('home',{admin:false, login : true, user : userdata.data , product : allproductdata.data, myProduct : productdata.data, bid : bidProduct.data, biddedSeller : bidProductSeller.data});
    } else {
        res.render('index' ,{login:false, admin:false, message : "Enter valid credential.."});
    }
}

exports.update_profile = async(req, res) => {
    const userid = req.params.id;
    try {
        let userdata = await axios.get(`http://localhost/api/users/${userid}`);
        // console.log(userdata.data);
        res.render("updateProfile", { admin:false, user : userdata.data});
    } catch (error) {
        res.send(error);
    }
}

exports.plece_product = async(req, res) => {
    const userid = req.params.id;
    try {
        const userdata = await axios.get(`http://localhost/api/users/${userid}`);
        if(userdata.data.address != null){
            res.render('placeProduct', { user : userdata.data });
        } else {
            res.send({ Message : " Please Add Address to place a product. " });
        }
    } catch (error) {
        res.send(error);
    }
}

exports.update_product = async(req, res) => {
    const id = req.query.id;
    try {
        let productdata = await axios.get(`http://localhost/api/products?id=${id}`);
        let imgs = await axios.get(`http://localhost/api/products-imgs/${productdata.data._id}`);
        // console.log(productdata.data);
        res.render('updateProduct', {product : productdata.data, imgs : imgs.data});
    } catch (error) {
        res.send(error);
    }
}

exports.product_view = async(req, res) => {
    const id =  req.query.id;

    try {
        let productdata = await axios.get(`http://localhost/api/products?id=${id}`);
        let imgs = await axios.get(`http://localhost/api/products-imgs/${productdata.data._id}`);
        
        res.render('ProductView', { product : productdata.data, imgs : imgs.data });
    } catch (error) {
        res.send(error);
    }
}

exports.auction = async(req, res) => {
    const userid = req.query.userId;
    const productid = req.query.productId;
    try {
        let userdata = await axios.get(`http://localhost/api/users/${userid}`);
        // console.log(userdata.data);
        let productdata = await axios.get(`http://localhost/api/products?id=${productid}`);
        // console.log(productdata.data);
        let biddata = await axios.get(`http://localhost/api/product/bid?productId=${productid}`);
        // console.log(biddata.data);
        let imgs = await axios.get(`http://localhost/api/products-imgs/${productdata.data._id}`);
        console.log(imgs.data);
        
        // res.render('liveAuction', { user : userdata.data, product : productdata.data, bid : biddata.data, imgs : imgs.data });
        res.render('newLiveAuction', { user : userdata.data, product : productdata.data, bid : biddata.data, imgs : imgs.data });
    } catch (error) {
        res.send(error);
    }
}