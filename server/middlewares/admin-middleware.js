const adminMiddleware = (req,res,next)=>{
    try {
        
        const adminRole = req.user.isAdmin;
      //  res.json(adminRole)
        if(!adminRole){
            return res.json({ message : "Access denied , you are not admin"})
        }
        next();

    } catch (error) {
        next(error)
    }
}


module.exports = adminMiddleware

