const jwt = require("jsonwebtoken");

const getToken = async(userID)=>{
    try{
        let token = await jwt.sign({userID}, process.env.JWT_SECRET, {expiresIn : "8d"});
        return token;

    }
    catch(error){
        console.log("Error in the Token");

    }
}

module.exports = getToken;