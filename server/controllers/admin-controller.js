const User = require("../models/user-model")
const Contact = require("../models/contact-model")


const getAllUsers = async (req,res)=>{
try {

    const users = await User.find({},{password:0})
    console.log(users)

    if(!users){
        return res.status(404).json("users not found")
    }
    
    return res.status(200).json(users)
} catch (error) {
    next(error)
}
}



const getAllContacts = async (req,res)=>{
    try {    
        const contacts = await Contact.find()
        console.log(contacts)
    
        if(!contacts){
            return res.status(404).json("contacts not found")
        }        
        return res.status(200).json(contacts)
    } catch (error) {
        next(error)
    }
    }


const deleteUserById = async (req,res)=>{
    try {

        const id= req.params.id;
        await User.deleteOne({_id:id});
        return res.json({message: "user deleted successfully"})
        
    } catch (error) {
        next(error)
    }
}


const deleteContactById = async (req,res)=>{
    try {

        const id= req.params.id;
        await Contact.deleteOne({_id:id});
        return res.json({message: "contact deleted successfully"})
        
    } catch (error) {
        next(error)
    }
}



//Single user login :----

const getUserById = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await User.findOne({_id:id},{password: 0})
        res.json(data)

    } catch (error) {
        console.log(error)
    }
}


//update user:-

const updateUserById = async (req,res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({_id:id},{$set:updatedUserData})
    } catch (error) {
        next(error)
    }
}


module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};