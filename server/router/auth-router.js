const express = require("express");
const router =  express.Router();
const {signupSchema,loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

// const {home,register} = require("../controllers/auth-controller")    //OR
const authControl = require("../controllers/auth-controller.js");
const authMiddleware = require("../middlewares/auth-middleware.js");


router.route('/').get(authControl.home)


router.route('/register').post(validate(signupSchema),authControl.register);


router.route('/login').post(validate(loginSchema),authControl.login)   


router.route("/users").get(authMiddleware,authControl.user)




module.exports = router;