const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
dotenv.config();

const port=process.env.PORT || 5000;
const mongoURI=process.env.MONGO_URI;

mongoose.connect(mongoURI).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});