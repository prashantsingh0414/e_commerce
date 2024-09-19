const mongoose =require ('mongoose');
const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/express-commerce');
        console.log('connected to db') ;
    }
    catch{
        console.log(error)
    }
    
}
module.exports=connectDb;