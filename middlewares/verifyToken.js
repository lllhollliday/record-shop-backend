import jwt from "jsonwebtoken"
import UsersCollection from "../models/usersschema.js"

async function verifyToken(req,res,next){

    try{
        // extracting token out from headers
       /*  const { token } = req.headers */
      /*  console.log(req.cookies.token) */
        const {token} = req.headers
        //verify token
        const payload = jwt.verify(token , process.env.TOKEN_SECRET_KEY )
        
        // get user from database
        const user = await UsersCollection.findById(payload._id)

        //attching user in request
        req.user = user; 
        next()

    }
    catch(err){
        next(err)
    }

}

export default verifyToken;