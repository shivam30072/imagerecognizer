const mongoose = require('mongoose');
function connectDB(URL){
    return(

        mongoose.connect(URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
    )
        
    
}

module.exports = connectDB