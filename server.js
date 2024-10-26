const express = require('express');
const app = express();
const db = require('./db'); // Assuming db.js handles the MongoDB connection
const Person = require('./models/Person'); // Import the Person model
const bodyParser = require('body-parser');
const MenuItem=require('./models/MenuItem');
const { request } = require('./routes/personRoutes');

app.use(bodyParser.json()); // Middleware to parse JSON request bodies

// Default route
app.get('/', (req, res) => {
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