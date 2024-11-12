const express = require('express');
const app = express();
const db = require('./db'); // Assuming db.js handles the MongoDB connection
const Person = require('./models/Person'); // Import the Person model
const bodyParser = require('body-parser');
const MenuItem=require('./models/MenuItem');
const { request } = require('./routes/personRoutes');


require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


app.use(bodyParser.json()); // Middleware to parse JSON request bodies


//middleware function
const logRequest=(req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}], Request Made to: ${req.originalUrl}`);
  next();
  
}

app.use(logRequest);

passport.use(new LocalStrategy(async(username,password,done)=>{
  try{
      console.log('Received Credentials: ',username,password);
      const user=await Person.findOne({username:username});
      if(!user){
        return done(null,false,{message: 'Incorrect username. '})
      }

      const isPasswordMatch=user.password === password ? true:false;
      if(isPasswordMatch){
        return done(null,user);
      }else{
        return done(null,user,{message: 'Incorrect password'});
      }
      
  }catch(err){
    return done(err);
  }
}))

// Initialize passport middleware
app.use(passport.initialize());

// Default route
const localAuthMiddleware= passport.authenticate('local',{session:false})
app.get('/',localAuthMiddleware,(req, res) => {
  res.send('Welcome To Our Hotel');
});


 //import the router files
 const personRoutes=require('./routes/personRoutes');
 const menuItem=require('./routes/menuItemRoutes');
  
 //use the routers
 app.use('/person',personRoutes);
 app.use('/menu',menuItem);

  // Listen on PORT
  const PORT = process.env.PORT || 3001; // Use 3001 if 3000 is busy
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });