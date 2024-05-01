const Service = require('../models/service-model')

const services = async (req,res) =>{

    try {
        const response = await Service.find();
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }

}

module.exports = services;