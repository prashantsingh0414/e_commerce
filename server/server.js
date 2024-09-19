require('dotenv').config();
const express = require ('express');
const app =express();
const cors =require ('cors');
const path = require('path');
const cookieParser =require('cookie-parser');


app.use(express.json());

app.use(cors());


const PORT = process.env.PORT || 5000;
app.use(cookieParser());

const connectDb = require('./db/dbConnection');
connectDb();


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(req,res)=>{
    res.json({msg:"This Is Just  Demo"})
})

app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/categoryRouter'))
app.use('/api',require('./routes/upload'))
app.use('/api',require('./routes/productRouter'))



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
