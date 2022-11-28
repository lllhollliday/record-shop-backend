import express from "express"
import { createRecord, getAllRecords, getSingleRecord, updateRecord } from "../controllers/recordscontroller.js"
import { isAdmin } from "../middlewares/isAdminMiddleware.js"
import verifyToken from "../middlewares/verifyToken.js"

const route = express.Router()


// Route GET 
route.get("/", getAllRecords)

// Route POST 
route.post("/", verifyToken, getSingleRecord)

// Route PATCH 
route.patch("//:id", verifyToken, createRecord)

// Route DELETE
route.delete("//:id", verifyToken, updateRecord)


export default route

