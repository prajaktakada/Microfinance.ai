const express = require('express');

const router = express.Router();

 const userController=require("../controllers/UserController")
 const TrainController=require("../controllers/TrainController")
 const bookingController = require('../controllers/BookingController')
 const Middleware=require("../middleware/Authentication")

 //User api
 router.post('/user',userController.createUser)
 router.post('/login',userController.login)

 //train api
 router.post('/train/postTrain',Middleware.Auth,TrainController.postTrain)
 router.get('/train/getAllTrain',Middleware.Auth,TrainController.getAllTrain)
 router.get('/train/:id',TrainController.getTrain)
 router.delete('/train/DeleteTrainbyQuery',TrainController.DeleteTrainbyQuery)


// booking api
router.post('/booking',bookingController.createBook)
router.get('/getBook',bookingController.getBook)
router.delete('/deleteBooking',bookingController.deleteBooking)

module.exports = router;
