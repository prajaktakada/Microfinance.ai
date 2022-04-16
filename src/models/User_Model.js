const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname: {type: String,trim: true},
    Lname: {type: String,trim: true},
    title: {type: String,required: true,enum: ['Mr', 'Mrs', 'Miss']},
    gender:{type: String,trim: true},
    is_admin: {type: Boolean,default:null},
    age:{type:Number , min:18 , max:70},
    occupation:{type:String} ,
    email: { type : String , unique:true} ,
    mobile:{type:Number ,unique:true} ,
    password: {type: String,required: true},
    city : {type:String},
    state:{type:String},
    train_name :{type:String},
    travel_date :{type:Date},
    Class:{type:String},
    from: {type:String},
    To :{type:String}
      
    },{ timestamps: true })

module.exports = mongoose.model('user', userSchema)

