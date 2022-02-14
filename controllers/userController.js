const Users = require('../models/userModel'); 
const bycrpt = require('bcrypt')



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
            
            //save the user to the database. 
            await newUser.save(); 


            res.json({msg: 'User registered successfully'}); 
       } catch (err) {
            return res.status(400).json({msg: err.message});
       }
    }
}


module.exports = userController;  