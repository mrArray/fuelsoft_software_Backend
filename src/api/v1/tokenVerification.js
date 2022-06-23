const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('fuelsoft-token');
    if(!token)return res.status(401).send(
        {
            status: 'Access Denied',
            message:"Sorry you don't have access to this resources"

        }
    );
    try{
        const verification =jwt.verify(token,process.env.ENCRYPT_TOKEN);
        req.user = verification ;
        next();
    }catch(error){
        res.status(400).send(
            'Invalid Token'
        )
    }
}