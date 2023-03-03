const axios = require('axios');

exports.login = (req, res) => {
    res.render('adminLogin');
}

exports.login_check = async(req,res) => {
    if(!req.body){
        res.send({message : "empty data can not be accepted.."});
        return;
    }
    try {
        let data = await axios.get('http://localhost/admin/api/admin-detail');
        if(data.data[0].password == req.body.password){
            let userdata = await axios.get('http://localhost/api/users');
            let productdata = await axios.get('http://localhost/api/products');
            let requestedproduct = await axios.get('http://localhost/admin/requested-product');
            // console.log(requestedproduct.data);
            res.render('loginHome', { user : data.data , admin : true , userdata : userdata.data, product : productdata.data, requestProduct : requestedproduct.data });
        } else {
            res.send({ message : "password not match.." });
        }
    } catch (error) {
        res.send(error);
    }
}

exports.update_admindata = async(req, res) => {
    try {
        let admindata = await axios.get('http://localhost/admin/api/admin-detail');
        console.log(admindata.data)
        res.render('updateProfile', {admin : true, user : admindata.data});
    } catch (error) {
        res.send(error);
    }
}