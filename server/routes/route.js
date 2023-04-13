const express = require('express');
const multer = require('multer');
const route = express.Router();

const services = require("../services/render");
const controller = require("../controller/controller");

const storage = multer.diskStorage({
    destination : './public/productImages',
    filename : (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage : storage
}).array('productImage');


route.get('/api/users', controller.find_user);
route.get('/api/users/:id', controller.find_user_by_id);
route.post('/api/users', controller.create_user);
route.put('/api/users/:userId', controller.update_user);
route.delete('/api/users/:userId', controller.delete_user);

route.post('/api/placeProducts/:id', upload, controller.add_product);
route.get('/api/products/:id', controller.find_product);
route.get('/api/products', controller.all_product);
route.delete('/api/products/:id', controller.delete_product);
route.put('/api/products/:id', controller.update_product);

route.get('/api/products-imgs', controller.all_img);
route.get('/api/products-imgs/:id', controller.img_by_productId);

route.get('/api/product/bid', controller.find_bid);
route.put('/api/product/bid', controller.update_bid);
route.put('/api/product-Bidded/:id', controller.product_bidded);
// route.get('/api/product/bid/:id', controller.find_bid_by_userId);

route.get('/', services.homeRoutes);
route.get('/place-product/:id', services.plece_product);
route.post('/', services.logedin_home);

route.get('/update-profile/:id', services.update_profile);
route.get('/user-product-update', services.update_product);
route.get('/productView', services.product_view);

route.get('/auction', services.auction);

module.exports = route;