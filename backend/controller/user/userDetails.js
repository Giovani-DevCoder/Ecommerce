const userModel = require("../../models/userModel")

async function userDetailsController(req, res) {
    try{
      const user = await userModel.findById(req.userId).select('firstName lastName email profilePic role');
  
      res.status(200).json({
        data: user,
        error: false,
        success: true,
        message: "Detalles del usuario obtenidos correctamente"
      });
    }catch(err){
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
      });
    }
  }
  

module.exports = userDetailsController;