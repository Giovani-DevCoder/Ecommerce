const express = require('express');
const router = express.Router();

const userSignUpController = require('../controller/user/userSignUp');
const userLoginController = require('../controller/user/userSignIn');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const allUsers = require('../controller/user/allUsers');
const updateUser = require('../controller/user/updateUser');
const uploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getProductCategory = require('../controller/product/getProductCategory')

router.post("/signup",userSignUpController);
router.post("/login",userLoginController);
router.get("/user-details",authToken,userDetailsController);
router.get("/userLogout",userLogout);

//** admin-panel */
router.get("/all-users",authToken,allUsers);
router.post("/update-user",authToken,updateUser);

router.post("/upload-product",authToken,uploadProductController);
router.get("/get-product",getProductController);
router.get("/get-productCategory",getProductCategory)
router.post("/update-product",authToken,updateProductController)

module.exports = router;