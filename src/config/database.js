const mongoose = require('mongoose')


async function connectToDB() {
   try{
    await mongoose.connect(process.env.MONGO_URI);
     console.log("Mongo DB is Connected Successfully...")
   }
   catch(e){
    console.log("Mongo DB Connection Error...", e);
   }
   
}

module.exports = connectToDB