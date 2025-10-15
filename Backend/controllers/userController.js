const User = require("../model/User.js");

const getCurrentUser = async(req , res ) => {
    try{
        
        let user = await User.findById(req.user.userId).select("-password");

        if(!user){
            return res.status(400).json({message: "User Doesn't Find"});
        }

        return res.status(200).json(user);

    }
    catch(error){

        return res.status(500).json({message: `Get current User Error : ${error}`});

    }
};

module.exports = getCurrentUser;