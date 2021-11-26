const { ValidateSignature } = require('../../utils');

module.exports = async (req,res,next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Access Denied!',
      });
    }
    try{
        const isAuthorized = await ValidateSignature(req);

        if(isAuthorized){
            return next();
        }
    }catch(err){
        res.status(401).json({
            message: 'Invalid Token!',
        });
    }
}