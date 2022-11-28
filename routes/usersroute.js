import express from "express"
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userscontrollers.js"

import verifyToken from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/isAdminMiddleware.js";

const route = express.Router()


// Route GET 
route.get("/", verifyToken, isAdmin, getAllUsers)

// Route GET
route.get("/", getSingleUser)

// POST
route.post("/", createUser)

// Route PATCH 
route.patch("/:id", verifyToken, updateUser)

// Route DELETE
route.delete("/:id", verifyToken, deleteUser)

export default route