const mongoose=require('mongoose')

//Define the MongoDB Connection URL
const mongoURL='mongodb://localhost:27017/hotels'

//set up MongoDB coneection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;

//Define event listeners for Database connection

db.on('connected',()=>{
    console.log("Connected to MongoDB server");  
})

db.on('error',(err)=>{
    console.error('MongoDB connection error',err);
    
})
db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//Export the database connection
module.exports=db;
