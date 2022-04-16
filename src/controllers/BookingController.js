const bookingModel = require("../models/Booking_Madel");
const userModel = require("../models/User_Model");
const train = require("../models/Train_Model");

const createBook = async (req, res) => {
    try{
    // details from body
    const { train_id, user_id } = req.body;
    let findNorMalUser = await userModel.findOne({_id:req.body.user,is_admin:false})
    if(findNorMalUser){

    // validation
    if (!train_id || !user_id)
      return res.json({ msg: "please enter all the fields" });
  
    const train_available = await train.findOne({ _id: train_id });
    const user_available = await userModel.findOne({ _id: user_id });
    if (!train_available&&!user_available) return res.status(400).send({ msg: "train_id or user id not valid" });

    // creating and saving a booking
    const newBook = {user: user_available._id,train: train_available._id}

    let savedBooking = await bookingModel.create(newBook)

train_available.AvailableCapacity.Count=train_available.AvailableCapacity.Count-1;
await train_available.save();

return res.status(201).send({ status: true, data: savedBooking })
   
}
}catch (err) {
    res.status(500).send({ status:false,message: err.message})
}
};


const getBook = async (req, res) => {
    try{
    const { id } = req.params;
  
    const bookExist = await bookingModel.findOne({ _id: id });
  
    if (!bookExist) return res.status.send({status:false,msg: "Booking does not exist" });
    else
    return res.status.send({booking_id: bookExist._id,train_id: bookExist.train,user_id: bookExist.user});
}catch (err) {
    res.status(500).send({ status:false,message: err.message})
}
};
  


const deleteBooking = async (req, res) => {
    try {
        let requestbody = req.body;
        let TokenDetail = req.user;
        const BookingFound = await bookingModel.findOne({ user: user })

        if (!BookingFound) {
            return res.status(404).send({ status: false, message: `No answer found` })
        }
        if (BookingFound.isDeleted == true) {  
            return res.status(400).send({ status: false, message: "booking not exists" })
        }

        let { user, train } = requestbody

        const trainFound = await train.findOne({ _id: requestbody.train})

        if (!trainFound) {
            return res.status(404).send({ status: false, message: ` No train found` })
        }
        const UserFound = await userModel.findOne({ _id: requestbody.user})
        if (!UserFound) {
            return res.status(404).send({ status: false, message: ` No User found` })
        }

        if (!(TokenDetail == requestbody.user)) {
            return res.status(400).send({ status: false, message: "Userid are not mathched" })
        }
        
        let data = await bookingModel.findOneAndUpdate({ user: user}, { isDeleted: true}, { new: true })
        trainFound.AvailableCapacity.Count=trainFound.AvailableCapacity.Count+1;
        await trainFound.save();
       
        return res.status(200).send({ status: true, message: `delete successfully`, data: data })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = {createBook,getBook,deleteBooking};
