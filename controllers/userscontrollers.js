import express from "express"
import UsersCollection from "../models/usersschema.js"
import { validationResult } from "express-validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const route = express.Router()

export const getAllUsers = async (req, res, next) => {
  // controller // request handler
  try {
    const users = await UsersCollection.find()

    res.json(users)
    //res.send("received get request on users")
  } catch (err) {
    next(err)
    // res.json({ success: false, message: err.message });
  }
}

export const getSingleUser = async (req, res, next) => {
  "/users/:id"
  "users/123"

  try {
    const id = req.params.id
    const singleUser = await UsersCollection.findById(id)
    res.json({ success: true, user: singleUser })
  } catch (err) {
    const error = new Error("id doesn't exist")
    error.status = 404
    next(error)
    //res.json({ success: false, message: err.message });
  }
  // res.send("received post request on Users")
}
/* 
export const createUser = async (req, res) => {
  // POST request to create User
  // res.send("received patch request on Users")
  try {
    const results = validationResult(req);
    if (results.isEmpty()) {
      const user = new UsersCollection(req.body);
      await user.save();
      res.json({ success: true, User });
    } else {
      next(result.errors)
    }
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
 */

// encrypting:
// register // signup user
export const createUser = async (req, res, next) => {
  try {
    // before storing user into database, hash user password
    // hashing password using bcrypt
    // bcrypt.hash asynchronous // bcrypt.hashSync synchronous
    // bycrypt.compare synchronous // bcrypt.compareSync synchronous

    /*     const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    req.body.password = hashedPassword;
 */
    const user = new UsersCollection(req.body)
    if (req.file) {
      user.profileImage = `http://localhost:4000/${req.file.filename}`
    }
    student = { name: "Lucy", age: 23 }
    user = { ...user, ...req.body }
    await user.save()

    // console.log(user.fullName)

    res.json({ success: true, user })
     
  } catch (err) {
    next(err)
  }
}

export const updateUser = async (req,res,next)=>{
  // Patch request /users/:id
  try{
      let user = await UsersCollection.findById(req.params.id)
      if(req.file){
          user.profileImage = `http://localhost:4000/${req.file.filename}`
      }
      if(req.body.password){
         user.password = req.body.password 
      }
      await user.save()

      let body ={}
      for(const key in req.body ){
          if(req.body[key]!=="" && key !== "password"){
              body[key] = req.body[key]
          }
      }
      
     const updatedUser = await UsersCollection.findByIdAndUpdate(req.params.id, body ,{new:true} ) 
   /*   const updatedUser = await UsersCollection.findOneAndUpdate({_id:req.params.id} , {$set: body} ,{new:true} )  */
      res.json({success:true, data:updatedUser})
  }
  catch(err){
      next(err)
  }
}       

export const loginUser = async (req, res, next) => {
  try {
    const user = await UsersCollection.findOne({ email: req.body.email })
    if (user) {
      const check = await bcrypt.compare(req.body.password, user.password)
      if (check) {
        // authentication // create token
        // first argument in sign is payload (users data)

        let token = jwt.sign(
          { _id: user._id, firstName: user.firstName },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: "24h", issuer: "Lucy", audience: "Students" }
        )

        const updatedUser = await UsersCollection.findByIdAndUpdate(
          user._id,
          {
            token: token,
          },
          {
            new: true,
          }
        )
        res.cookie("token", token)
        // res.header("token", token)
        res.json({ success: true, data: updatedUser })

        res.json({ success: true, data: user, token: token })
      } else {
        throw new Error("password doesn't match")
      }
    } else {
      throw new Error("email doesn't exist")
    }
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req,res,next)=>{
  //Delete request /users/:id
  try{
      const {id}= req.params 
      //findByIdAndDelete
/*         const deletedItem = await UsersCollection.findByIdAndRemove(id) */

      const existingUser = await UsersCollection.findById(id)

      if(existingUser){
          const deleteStatus = await UsersCollection.deleteOne({_id:existingUser._id})
          res.json({success:true, status: deleteStatus})
      }else{
          throw new Error("user id doesn't exist ! ")
      }
      
  }
  catch(err){
      next(err)
  }
}

  export const checkUserToken = async (req,res,next)=>{
      try{
          const token = req.headers.token
          const payload = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

          const user = await UsersCollection.findById(payload._id)
          res.json({success:true, data: user})
      }
      catch(err){
          next(err)
      }
  }

export default route

/* import express from "express"

const route = express.Router()


// Route GET 
export const getAllUsers = (req,res) => {
    res.send("received get request on users")
}

// Route POST 
export const getSingleUser = (req,res) => {
    res.send("received post request on users")
}

// Route PATCH 
export const updateUser = (req,res) => {
    res.send("received patch request on users")
}

// Route DELETE
export const deleteUser = (req,res) => {
    res.send("received delete request on users")
}

export default route */
