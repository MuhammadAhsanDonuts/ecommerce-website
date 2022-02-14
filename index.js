require('dotenv').config(); //  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000
const app = express(); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json()); 
app.use(cookieParser());
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}));


//routes
app.use('/user', require('./routes/userRouter')); 


//connect to mongo database
const URI = process.env.MONGODB_URL; 
mongoose.connect(URI, {useNewUrlParser: true }).then(()=> {
    console.log("Database connected successfully")
    app.listen(PORT, () => {
    
        console.log(`Server is running on http://localhost:${PORT}`)
    })
})
.catch((error) => console.log(error.message)); 





app.get('/', (req, res) => {
    res.json({msg : 'It is Ahsan, and I love it!'}); 
})


