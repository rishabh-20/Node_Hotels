const mongoose=require('mongoose')

//Define the person Schema

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        require: true,
        type: String
    },
    password:{
        require: true,
        type: String
    }

});

//create Person model
const Person=mongoose.model('person',personSchema);
module.exports=Person;