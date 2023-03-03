const { Router } = require('express');
const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');
const adminServices = require('../services/adminRender');

router.get('/', adminServices.login);
router.post('/', adminServices.login_check);
router.get('/update-profile', adminServices.update_admindata);

router.get('/requested-product', adminController.request_product);
router.get('/api/admin-detail', adminController.admin_detail);
router.put('/api/admin-detail',adminController.update_detail);
router.post('/api/approve-product', adminController.approve_product);
router.post('/api/not-approve-product', adminController.not_approve_product);

module.exports =  router;