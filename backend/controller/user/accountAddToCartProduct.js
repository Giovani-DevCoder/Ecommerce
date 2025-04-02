const addToCartModel = require("../../models/cartProduct");

const accountAddToCartProduct = async(req,res) => {
    try{
        const userId = req.userId

        const count = await addToCartModel.countDocuments({
            userId : userId
        }) 
        
        res.json({
            data : {
                count : count
            },
            message : "ok",
            success : true,
            error   : false
        })

    } catch(error){
        res.status(500).json({
            message : err?.message || "Internal Server Error",
            error   : true,
            success : false,
        });
    }
}

module.exports = accountAddToCartProduct