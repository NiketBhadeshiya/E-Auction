const mongoose = require('mongoose');
const User = require('../model/userModel');
const Product = require('../model/productModel');
const Admin = require('../model/adminModel');


exports.login_check = async(req,res) => {
    if(!req.body) {
        res.send({message : "Empty data can not accepted.."});
        return;
    }

    try {
        let data = await Admin.find({ userName : req.body.userName });
        res.send(data);
    } catch (error) {
        res.send(error);
    }
}

exports.request_product = async(req, res) => {
    try {
        let requested_product = await Product.find({ approvedByAdmin : 'Requested' });
        res.send(requested_product);
    } catch (error) {
        res.send(error);
    }
}

exports.admin_detail = async(req, res) => {
    try {
        let admindata = await Admin.find();
        res.send(admindata);
    } catch (error) {
        res.send(error);
    }
}

exports.update_detail = async(req, res) => {
    try {
        let data = await Admin.findByIdAndUpdate(req.body.id, {
            userName : req.body.userName,
            password : req.body.password,
            name : {
                firstName : req.body.firstName,
                lastName : req.body.lastName
            },
            contactNo : req.body.contactNo
        });
        res.send(data);
    } catch (error) {
        res.send(error)
    }
}

exports.approve_product = async(req, res) => {
    const productId = req.query.productId;
    try {
        let updateddata = await Product.findByIdAndUpdate(productId, { isReviewed : 'Yes' , approvedByAdmin : 'Yes'});
        res.send(updateddata);
    } catch (error) {
        res.send(error);
    }
}

exports.not_approve_product = async(req, res) => {
    const productId = req.query.productId;
    try {
        let updateddata = await Product.findByIdAndUpdate(productId, { isReviewed : "Yes" , approvedByAdmin : 'No'});
        res.send(updateddata);
    } catch (error) {
        res.send(error);
    }
}