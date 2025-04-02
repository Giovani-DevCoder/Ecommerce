const express = require('express');
const router = express.Router();

const { 
    userSignUpController, 
    userLoginController, 
    userDetailsController, 
    userLogout, 
    allUsers, 
    updateUser, 
    uploadProductController, 
    getProductController, 
    updateProductController, 
    getProductCategory,
    getSmartProductCategory,
    addToCartController,
    getProductDetails,
    accountAddToCartProduct,
    addToCartView,
    updateAddToCartProduct,
    deleteAddToCartProduct,
    searchProduct,
    filterProductController
  } = require('../controller');
  
  const { authToken } = require('../middleware');

//** sign in */
router.post("/signup",userSignUpController);
router.post("/login",userLoginController);
router.get("/user-details",authToken,userDetailsController);
router.get("/userLogout",userLogout);

//** admin-panel */
router.get("/all-users",authToken,allUsers);
router.post("/update-user",authToken,updateUser);

//** product */
router.post("/upload-product",authToken,uploadProductController);
router.get("/get-product",getProductController);
router.get("/get-productCategory",getProductCategory);
router.post("/update-product",authToken,updateProductController);
router.post("/category-product",getSmartProductCategory);
router.post("/product-details",getProductDetails);
router.post("/filter-product",filterProductController)

//** user add to cart */
router.post("/addToCartProduct",authToken, addToCartController)
router.get("/accountAddToCartProduct",authToken,accountAddToCartProduct)
router.get("/add-to-cart-view",authToken,addToCartView)
router.post("/update-cart",authToken,updateAddToCartProduct)
router.post("/delete-cart",authToken,deleteAddToCartProduct)

//** search product */
router.get("/search",searchProduct)

module.exports = router;