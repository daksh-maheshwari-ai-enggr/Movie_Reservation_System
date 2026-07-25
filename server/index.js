const express=require('express');
const app=express();
const connectDB=require('./config/db.js');
const adminRoutes=require('./routes/admin.routes.js')
const dotenv=require('dotenv');
const cors=require('cors');

dotenv.config();

const port=process.env.PORT

app.use(cors())

app.use(express.json())

app.use("/api/admin",adminRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    connectDB();
});