const express = require('express')
const router = express()
const Person=require('./../models/Person');

// POST route to create a new Person
router.post('/', async (req, res) => {
    try {
      const data = req.body; // Assuming the request body contains the person data
  
      // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);
  
      // Save the new person to the database
      const response = await newPerson.save();
      console.log('data saved');
      res.status(200).json(response);
    } catch (err) {
      // Send error response if something goes wrong
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'})
      
    }
  });

//GET Method to get the person
router.get('/',async (req,res)=>{
  try{
    const data=await Person.find();
    console.log('data fetched');
    res.status(200).json(data);

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'})
  }

})

//
router.get('/:workType',async (req,res)=>{
  try{
    const workType=req.params.workType
    if(workType=='chef'|| workType=='manager'|| workType=='waiter'){
      const response=await Person.find({work:workType})
      console.log('response fetched');
      res.status(200).json(response)
    }else{
      res.status(404).json({error:'Invalid work type'});
    }
  }
  catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'}) 
  }
})

router.put('/:id',async (req,res)=>{
  try{
      const personId=req.params.id;
      const updatedPersonData=req.body;

      const response= await Person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,  //Return the updated document
        runValidators:true, //Run Mongoose Validation
      })

      if(!response){
        res.status(404).json({error:'Person Not found'})
      }

      console.log('Data Updated');
      res.status(200).json(response);
      

  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'})
  }
})

router.delete('/:id',async (req,res)=>{
  try{
    const personId=req.params.id;  
    const response=await Person.findByIdAndDelete(personId);

    if(!response){
      res.status(404).json({error:'Person Not found'})
    }

    console.log('Data Deleted');
    res.status(200).json({message:'Person Deleted Successfully'});
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'})
  }
})

module.exports=router;
