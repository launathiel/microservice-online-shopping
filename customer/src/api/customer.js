const CustomerService = require('../services/customer-service');
const  UserAuth = require('./middlewares/auth');
const Customer = require('../database/models/Customer')
const { signupValidation, loginValidation } = require('./middlewares/validator/customerValidation');
const { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword, SubscribeMessage } = require('../utils');

module.exports = (app, channel) => {
    
    const service = new CustomerService();
    SubscribeMessage(channel, service);

    app.post('/signup', async (req,res,next) => {
        try {
            const { email, password, phone } = req.body;
            //input register validation
            const { error } = signupValidation(req.body);
                if (error) return res.status(400).json({ error: error.details[0].message });
            //check is email exist
            const emailExist = await Customer.findOne({ email: req.body.email });
                if (emailExist) return res.status(400).json({ error: 'Email already exist!' });
            //if email doesn't exist
            const { data } = await service.SignUp({ email, password, phone}); 
           return res.json(data);
            
        } catch (err) {
            next(err)
        }

    });

    app.post('/login',  async (req,res,next) => {
        
        try {
            const { email, password } = req.body;
            //input login validation
            const { error } = loginValidation(req.body);
                if (error) return res.status(400).json({ error: error.details[0].message });
            //check the email in database
            const existingCustomer = await Customer.findOne({email: req.body.email});
                if (!existingCustomer) return res.status(400).json({ error: 'Account not found, please sign up!' });
            //chech is input password match with password in database
            const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                if(!validPassword){
                    return res.status(400).json({ error: 'Invalid password' });
                }else{
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id});
                    res.status(200).header('auth-token', token).json({
                        token: token,
                        id: existingCustomer._id,
                        data: existingCustomer.email,
                    });
                }
        } catch (err) {
            next(err)
        }
    });

    app.post('/address', UserAuth, async (req,res,next) => {
        
        try {
            
            const { _id } = req.user;
            
            const { street, postalCode, city,country } = req.body;
    
            const { data } = await service.AddNewAddress( _id ,{ street, postalCode, city,country});
    
            return res.json(data);

        } catch (err) {
            next(err)
        }


    });
     

    app.get('/profile', UserAuth ,async (req,res,next) => {

        try {
            const { _id } = req.user;
            const { data } = await service.GetProfile({ _id });
            return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
     

    app.get('/shoping-details', UserAuth, async (req,res,next) => {
        
        try {
            const { _id } = req.user;
           const { data } = await service.GetShopingDetails(_id);
    
           return res.json(data);
            
        } catch (err) {
            next(err)
        }
    });
    
    app.get('/wishlist', UserAuth, async (req,res,next) => {
        try {
            const { _id } = req.user;
            const { data } = await service.GetWishList( _id);
            return res.status(200).json(data);
            
        } catch (err) {
            next(err)
        }
    });
}