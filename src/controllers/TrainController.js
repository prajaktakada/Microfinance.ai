const train = require('../models/Train_Model')
const userModel = require('../models/User_Model')

const postTrain = async (req, res) => {
    try{
        let findAdmin = await userModel.findOne({_id:req.body.AdminId,is_admin:true})
        if(findAdmin){

        let decodedUserToken = req.user
        if (decodedUserToken.userId == findAdmin.AdminId) {
    const {Trainname,AdminId,destination,startpoint,startDate,reachDate,TotalCapacity,AvailableCapacity} = req.body;
  
    // validation
    if (!Trainname ||!AdminId||!destination ||!startpoint ||!startDate ||!reachDate ||!TotalCapacity||!AvailableCapacity)
      return res.status(400).send({ status:false,msg: "enter all the credentials" });
  
    const duplicateCheck = await train.findOne({Trainname});
  
    if (duplicateCheck)
      return res.status(400).send({status:false, msg: "train with same Trainname already exists" });
  
    // add new train
    const newTrain = {Trainname,destination,startpoint,startDate,reachDate,TotalCapacity,AvailableCapacity}
    let savedtrain = await train.create(newTrain).populate("user")
    res.status(201).send({ status: true, data: savedtrain,msg:"train created successfully" })
        } else {
            res.status(403).send({ Message: "you are trying to access a different's user account" })
        }       
}else{
            res.status(400).send({status:false,msg:"only admin is allowed to update details in train"})
        }
}catch (err) {
    res.status(500).send({ status:false,message: err.message})
}
}



const getAllTrain = async function (req, res) {
    try {
        let body = req.query;
        
        let decodedUserToken = req.user
        if (decodedUserToken.userId == findAdmin.AdminId) {
        let foundTrain = await train.find(body).sort({ startDate: -1 })
        if (foundTrain) {
            res.status(200).send({ status: true, data: foundTrain });
        }else {
            res.status(404).send({ status: false, msg: "No documents found" });
        }
    }else {
        res.status(403).send({ Message: "you are trying to access a different's user account" })
    }   
    }
    catch (err) {
        res.status(500).send({ status:false,message: err.message});
    }
}


const getTrain = async (req, res) => {
    try {
    const { id } = req.params;
  
    //validation
    if (!id) return res.status(400).send({ status:false,msg: "Id not found" });
  
    const outTrain = await train.findOne({_id: id,});
  
    if (!outTrain) return res.status(400).send({status:false,msg: "Train Does not exist"});
    else
    res.status(200).send({
      id: outTrain._id,
      name: outTrain.name,
      destination: outTrain.destination,
      startpoint: outTrain.startpoint,
      startDate: outTrain.startDate,
      reachDate: outTrain.reachDate,
      TotalCapacity: outTrain.TotalCapacity,
      AvailableCapacity: outTrain.AvailableCapacity,
    });
}
catch (err) {
    res.status(500).send({ status:false,message: err.message});
}
}


const DeleteTrainbyQuery = async function (req, res) {
    try {  
       
        let info = req.query
        let trainInfo = await train.findOne({info})
       
            let tempdata = await train.findOneAndUpdate({ id: trainInfo._id, isDeleted: false }, { isDeleted: true}) //deletedAt: Date() })
            if (tempdata) {
                res.status(200).send()
            } else {
                res.status(404).send({ err: "data might have been already deleted" })
            }
    
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




module.exports = {postTrain,getAllTrain,getTrain,DeleteTrainbyQuery};




