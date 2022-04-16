const mongoose = require('mongoose')

const TrainSchema = new mongoose.Schema({

    Trainname: {type: String,trim: true,unique:true},
      AdminId: [{type: mongoose.Schema.Types.ObjectId,ref: "user"}],
      destination: {type: String},
      startpoint: {type: String},
      startDate: {type: Date},
      reachDate: {type: Date},

      TotalCapacity:{
        Class:{type:String,trim: true,required: true},
        Count:{type:Number,trim: true,required: true},
        Price:{type:Number,trim: true,required: true},

      },
      AvailableCapacity:{
        Class:{type:String,trim: true,required: true},
        Count:{type:Number,trim: true,required: true},
        Price:{type:Number,trim: true,required: true},
      }

}, { timestamps: true })

module.exports = mongoose.model('train', TrainSchema)




