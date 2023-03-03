const mongoose = require('mongoose');
const User = require('../model/userModel');
const Product = require('../model/productModel');
const Bid = require('../model/bidModel');


exports.create_user = async (req, res) => {
    if (!req.body) {
        res.send({ message: "Field can not be empty" });
        return;
    }
    const newuser = new User({
        userName: req.body.userName,
        password: req.body.password,
        name: {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
    });

    try {
        const newuserdata = await newuser.save();
        res.send(newuserdata);
    } catch (error) {
        res.send(error);
    }
}

exports.find_user = async (req, res) => {
    if (req.query.userName) {
        // console.log(req.query.userName)
        const user = req.query.userName;
        // console.log(user);
        try {
            let userdata = await User.find({ userName: user });
            res.send(userdata);
        } catch (error) {
            res.send(error);
        }
    } else {
        try {
            let usersdata = await User.find();
            res.send(usersdata);
        } catch (error) {
            res.send(error);
        }
    }
}

exports.find_user_by_id = async (req, res) => {
    if (req.params.id) {
        const id = req.params.id;
        try {
            let userdata = await User.findById(id);
            res.send(userdata);
        } catch (error) {
            res.send(error);
        }
    } else {
        res.send('error retreiving data..');
    }
}

exports.update_user = async (req, res) => {
    if (!req.params.userId) {
        res.send({ message: "error generating update link" });
        return;
    }
    const id = req.params.userId;

    try {
        let updateddata = await User.findByIdAndUpdate(id, {
            userName: req.body.userName,
            password: req.body.password,
            name: {
                firstName: req.body.firstName,
                lastName: req.body.lastName
            },
            contactNo: req.body.contactNo,
            address: {
                buildingNo: req.body.buildingNo,
                buildingName: req.body.buildingName,
                landmark: req.body.landmark,
                city: req.body.city,
                state: req.body.state,
                pincode: req.body.pincode
            }
        });
        console.log("data updated..!!");
        res.send(updateddata);
    } catch (error) {
        res.send({ message: `error updating user with id : ${id}` });
    }
}

exports.delete_user = async (req, res) => {
    if (!req.params.userId) {
        res.send({ message: "error generating delete link" });
        return;
    }
    const id = req.params.userId;

    try {
        let updateddata = await User.findByIdAndDelete(id);
        res.send(updateddata);
    } catch (error) {
        res.send({ message: `error updating user with id : ${id}` });
    }
}

exports.add_product = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty !" });
        return;
    }
    console.log(req.body);
    const product = new Product({
        userId: req.params.id,
        productName: req.body.productName,
        startPrice: req.body.startPrice,
        productImage: req.file.filename,
        productDescription: req.body.productDescription
    });

    try {
        let data = await product.save();
        res.send(data);
    } catch (error) {
        res.send({ message: error.message });
    }
}

exports.find_product = async (req, res) => {
    const userId = req.params.id;
    try {
        let productdata = await Product.find({ userId: userId }).populate('userId');
        // console.log(productdata);
        res.send(productdata);
    } catch (error) {
        res.send({ message: error.message });
    }
}

exports.all_product = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        try {
            let productdata = await Product.findById(id).populate('userId');
            // console.log(productdata);
            res.send(productdata);
        } catch (error) {
            res.send({ message: error.message });
        }
    } else {
        try {
            let data = await Product.find({ approvedByAdmin : 'Yes' });
            res.send(data);
        } catch (error) {
            res.send(error);
        }
    }
}

exports.delete_product = async (req, res) => {
    if (!req.params) {
        res.send({ message: "Can not delete this product.." });
        return;
    }
    const id = req.params.id;
    try {
        let deletedata = await Product.findByIdAndDelete(id);
        res.send(deletedata);
    } catch (error) {
        res.send(error);
    }
}

exports.update_product = async(req, res) => {
    if(!req.params){
        res.send({message : "can not update data"});
        return;
    }
    const id = req.params.id;
    if(req.file == null){
        try {
            let data = await Product.findByIdAndUpdate(id, {
                productName : req.body.productName,
                startPrice : req.body.startPrice,
                productDescription : req.body.productDescription,
                approvedByAdmin : 'Requested'
            });
            console.log(data);
            res.send(data);
        } catch (error) {
            res.send(error);
        }
    } else {
        try {
            let data = Product.findByIdAndUpdate(id, {
                productName : req.body.productName,
                startPrice : req.body.startPrice,
                productImage : req.file.filename,
                productDescription : req.body.productDescription            
            });
            console.log(data.data);
            res.send(data);
        } catch (error) {
            res.send(error);
        }
    }
}

exports.find_bid = async(req, res) => {
    const productid = req.query.productId;
    try {
        let data = await Bid.find({productId : productid});
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

exports.update_bid = async(req,res) => {
    // const productid = req.query.productId;
    // const bidderid = req.query.bidderId;
    // const bidamount = req.query.bidAmount;
    // console.log(productid , " " , bidderid , " " , bidamount);

    try {
        let savedata = await Bid.updateOne( {productId : req.query.productId}, { $set : {
            bidderId : req.query.bidderId,
            bidAmount : req.query.bidAmount
        }});
        res.send(savedata);
    } catch (error) {
        res.send(error);
    }
}