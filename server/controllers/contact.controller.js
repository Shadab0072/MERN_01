const Contact = require("../models/contact-model");

const contactForm = async (req,res) =>{

try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json("message send successfully")   
}
catch (error) {
res.status(400).json("message not delivered")
}

}


module.exports = contactForm;