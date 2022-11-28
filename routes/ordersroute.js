import express from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controllers/orderscontrollers";

const route = express.Router();

// Route GET
route.get("/orders", getAllOrders);

// Route POST
route.post("/orders", getSingleOrder);

// Route PATCH
route.patch("/orders/:id", createOrder);

// Route DELETE
route.delete("/orders/:id", updateOrder);
export default route;
