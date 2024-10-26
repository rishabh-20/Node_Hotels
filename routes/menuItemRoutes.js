const express = require('express')
const router = express()
const MenuItem=require('./../models/MenuItem')

//Post Method for add a new menu
router.post('/',async(req,res)=>{
    try{
      const data=req.body
      const newMenu=new MenuItem(data);
      const response=await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
      
    }
  })
  
  router.get('/',async(req,res)=>{
    try{
      const data=await MenuItem.find();
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'}) 
    }
    
  });

  router.get('/:tastetype',async (req,res)=>{
    try{
        const tastetype=req.params.tastetype
        if(tastetype=='sweet'|| tastetype=='spicy'|| tastetype=='sour'){
            const response= await MenuItem.find({taste:tastetype});
            console.log('response fetched');
            res.status(200).json(response);   

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
      const menuId=req.params.id;
      const updatedMenuData=req.body;

      const response=await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
        new:true,
        runValidators:true,
      });

      if(!response){
        res.status(404).json({error:'Menu Not found'})
      }
      console.log('Data Updated');
      res.status(200).json(response);
    }catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error'})
    }
      
  })

  router.delete('/:id',async(req,res)=>{
    try{
      const menuId=req.params.id;

    const response=await MenuItem.findByIdAndDelete(menuId);
    if(!response){
      res.status(404).json({error:'Person Not found'})
    }
    console.log('Data Deleted');
    res.status(200).json({message:'Menu Deleted Successfully'});
    }
    catch(err){
      console.log(err);
        res.status(500).json({error:'Internal Server Error'}) 
    }

  })

  //for testing purpose
  module.exports=router;
  