// loading modules
const jwt = require("jsonwebtoken");
const userModel = require("../models/User_Model");
const bcrypt = require('bcrypt')

var isValid = function (value) {
  if (typeof value === 'undefined'|| value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  return true;
}
const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0
}


const createUser = async (req, res) => {
  try{ 
    let RequestBody = req.body

    if (!isValidRequestBody(RequestBody)) {
    return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
  }

  const { fname,Lname,title,gender,age,occupation,email,mobile, password,city,is_admin,state,train_name,travel_date,Class,from,To } = RequestBody;

 isValid = true;
 Object.values(RequestBody).forEach((val) => {
     if (!isValid(val) && isValid) {
      isValid = false;
     }
 })
 if (!isValid) {
  return res.status(400).send({ status: false, message: 'Invalid request parameters.' })
}

  // user already exist
  const duplicate = await user.findOne({email})
  if (duplicate){
      return res.status(400).send({ msg: "user with same email already exist" });
  }
  // default user
  if (is_admin == null) is_admin = false;

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    duplicate.password = await bcrypt.hash(duplicate.password, salt);

  // creating user
  const newUser = {fname,Lname,title,gender,age,occupation,email,mobile, password,city,is_admin,state,train_name,travel_date,Class,from,To }

  let savedUser = await userModel.create(newUser)
  res.status(201).send({ status: true, data: savedUser })

}catch (err) {
          res.status(500).send({ status:false,message: err.message})
        }
    }



const login = async function (req, res) {
    try {
        let useremail = req.body.email
        let userpassword = req.body.password
        if (useremail && userpassword) {
            let User = await userModel.findOne({ email: useremail, password: userpassword, isDeleted: false })

            if (User) {
                const Token = jwt.sign({ userId: User._id }, "microfinance")
                res.header('x-api-key', Token)
                //console.log(Token)
             
                res.status(200).send({ status: true,User:User._id,Token })
            } else {
                res.status(400).send({ status: false, Msg: "Invalid Credentials" })
            }
        } else {
            res.status(400).send({ status: false, msg: "request body must contain  email as well as password" })
        }
    }
    catch (err) {
        res.status(500).send({ status:false,message: err.message})
    }
}

module.exports = {createUser,login}