const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:Number,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },

});


//secure the password with bcryptjs:-

userSchema.pre("save", async function(next){      //pre-"save"....save hone se phle ye function run hoga

        const preUser = this;

        if(!preUser.isModified("password")){    //not-modified...old pswd exits..then next()..save in database
            next();
        }

        try{

            const saltRound = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash( preUser.password, saltRound)
            preUser.password =hash_password;

        }
        catch(error){
            next(error);
        }

})


// jsonwebtoken  :-
//const jwt = require("jsonwebtoken")


userSchema.methods.generateToken = async function(){                                          //instance method

try{
    return jwt.sign(
     {
        userId: this._id.toString(),                             //payload section      //identity
        email : this.email,                                      //payload section
        isAdmin : this.isAdmin,                                 //payload section
        
       },
       process.env.KEY,                //secret key
       {
        expiresIn: "30d",
       }
    )

}
catch(error){
    console.log("error in 'json web token' generation")
}

}






const User = new mongoose.model("User",userSchema);   

module.exports = User;
