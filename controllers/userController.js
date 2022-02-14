const Users = require('../models/userModel'); 
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken'); 


const userController = { 
   register: async (req, res) => {
       try {
            const {username, password, email} = req.body;
            const user = await Users.findOne({email});

            if(user == true) return res.status(400).json({msg: "The user already exists"}); 
            
            if(password.length < 6) return res.status(400).json({msg: "Password must be at least 6 characters"}); 
            
            //Password Encryption Variable named PasswordEncrypted
            const passwordEncrypted = await bycrpt.hash(password, 10); 
            //Password Encryption working Okay -- 

            const newUser = new Users({
               username, email, password: passwordEncrypted
            })
             //create jsonwebtoken. 
            // const accessToken = createAccessToken({id: newUser._id}); 
            const refreshToken = createRefreshToken({id: newUser._id})
            // res.json({refreshToken}); 
            res.cookie('refreshtoken', refreshToken, {
               httpOnly: true,
               path: '/user/refresh_token',
               secure: true
               
            });
                
      
           
            
            //save the user to the database. 
            await newUser.save(); 
            
       } catch (err) {
            return res.status(400).json({msg: err.message});
       }
    }, 

    refreshToken: (req, res) => {
       const rf_token = req.cookies.refreshtoken; //requesting for refresh token. 
       res.json({rf_token});
    }
}

const createAccessToken = (user) => {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
const createRefreshToken = (user) => {
   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = userController;  