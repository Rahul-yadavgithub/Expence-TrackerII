const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profileImageUrl : {
        type : String,
        default : null
    }
}, {timestamps : true});

// Now befor saving the data of the user we need to bcrypt the data so that i it can securily used hear 

UserSchema.pre("save",async function (next){
    if(!this.isModified("password")){   // If the user updates only their email or name, we don’t want to rehash the password again
        return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);

};


module.exports = mongoose.model("User", UserSchema);