const bcrypt = require('bcrypt');
const userModel = require("../../models/userModel");

async function userSignUpController(req, res) {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await userModel.findOne({email})
        if(user){
            throw new Error("Already user exits.")
        }

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!firstName) {
            throw new Error("Please provide firstName");
        }
        if (!lastName) {
            throw new Error("Please provide lastName");
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userData = new userModel({
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: "GENERAL"
        });

        await userData.save();

        res.json({
            message: "User created successfully",
            success: true
        });

    } catch (err) {
        res.json({
            message: err.message || "Error creating user",
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
