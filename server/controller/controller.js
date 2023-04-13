const mongoose = require('mongoose');
const User = require('../model/userModel');
const Product = require('../model/productModel');
const Bid = require('../model/bidModel');
const IMG = require('../model/imgModel');
const fs = require('fs');


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
        },
        contactNo : req.body.contactNo
    });

    try {
        const user = new User(req.body)        
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
    // res.send(req.files);

    const product = new Product({
        userId: req.params.id,
        productName: req.body.productName,
        startPrice: req.body.startPrice,
        productImage : req.files[0].filename,
        odometer: req.body.odometer,
        noOfOwner : req.body.noOfOwner,
        colour : req.body.colour,
        engine : req.body.engine,
        registrationNo : req.body.registrationNo,
        damage : req.body.damage,
        accident : req.body.accident,
        model : req.body.model,
        manufacturer : req.body.manufacturer,
        year : req.body.year,
        month : req.body.month,
        fuel : req.body.fuel
    });

    try {
        var productData = await product.save();
    } catch (error) {
        res.send({ message: error.message });
    }

    let files = req.files;

    //convert images to base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path);

        return encode_image = img.toString('base64');
    })

    let result = imgArray.map((src, index) => {

        //create object to store data in the collection
        let finalImg = {
            productId : productData._id ,
            productImage : req.files[index].originalname,
            mimeType : req.files[index].mimetype,
            path : req.files[index].path
        }

        let newImg = new IMG(finalImg);

        return newImg.save().then(() => {
            return { msg : `${files[index].originalname} Uploaded successfully...` }
        }).catch(err => {
            if(err) {
                if(err.name == "MongoError" && err.code==11000) {
                    return Promise.reject({ error : `Duplicate ${files[index].originalname}, file already exist` })
                }
                return Promise.reject({ error : err.message });
            }
        })

    })

    const bid = new  Bid({
        sellerId : req.params.id,
        productId : productData._id,
        bidAmount : productData.startPrice
    });

    try {
        let biddata = await bid.save();
    } catch (error) {
        res.send(error);
    }

    Promise.all(result).then(msg => {
        res.json(msg);
    }).catch(err => {
        res.json(err);
    })

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
    if (req.query.id != null) {
        const id = req.query.id;
        try {
            // let productdata = await IMG.find({ productId : id }).populate('productId');
            let productdata = await Product.findById(id).populate('userId');
            // console.log(productdata);
            res.send(productdata);
        } catch (error) {
            res.send({ message: error.message });
        }
    } else {
        try {
            let data = await Product.find({ approvedByAdmin : 'Yes' });
            // console.log(data);
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
                odometer: req.body.odometer,
                noOfOwner : req.body.noOfOwner,
                colour : req.body.colour,
                engine : req.body.engine,
                registrationNo : req.body.registrationNo,
                damage : req.body.damage,
                accident : req.body.accident,
                model : req.body.model,
                manufacturer : req.body.manufacturer,
                year : req.body.year,
                month : req.body.month,
                fuel : req.body.fuel,
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


exports.product_bidded = async(req,res) => {
    const id = req.params.id;
    try {
        let data = await Product.findByIdAndUpdate(id, { isBidded : "Yes" });
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
}


exports.find_bid = async(req, res) => {
    if(req.query.productId != null){
        const productid = req.query.productId;
        try {
            let data = await Bid.find({productId : productid});
            res.send(data);
        } catch (error) {
            res.send(error);
        }
    }else if(req.query.bidderId != null){
        const bidderid = req.query.bidderId;
        try {
            let data = await Bid.find({bidderId : bidderid}).populate("bidderId").populate("sellerId").populate("productId");
            // console.log(data);
            res.send(data);
        } catch (error) {
            res.send(error);
        }
    } else if(req.query.sellerId != null){
        const sellerid = req.query.sellerId;
        try {
            let data = await Bid.find({sellerId : sellerid}).populate("bidderId").populate("sellerId").populate("productId");
            // console.log(data);
            res.send(data);
        } catch (error) {
            res.send(error);
        }
     } else {
        try {
            let data = await Bid.find().populate("bidderId").populate("sellerId").populate("productId");
            res.send(data);
        } catch (error) {
            res.send(error);
        }
    }
}

// exports.find_bid_by_userId;

exports.update_bid = async(req,res) => {

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

exports.img_by_productId = async(req, res) => {
    const id = req.params.id;

    try {
        let data = await IMG.find({ productId : id });
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }
}

exports.all_img = async(req, res) => {
    
    try {
        let data = await IMG.find();
        res.send(data);
    } catch (error) {
        res.send(error.message);
    }

}