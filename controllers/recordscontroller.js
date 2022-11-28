import express from "express";
import RecordsCollection from "../models/recordsschema.js";
import OrdersCollection from "../models/ordersschema.js";
import UsersCollection from "../models/usersschema.js";

const route = express.Router();

export const getAllRecords = async (req, res, next) => {
  // controller // request handler
  try {
    const records = await RecordsCollection.find();

    res.json(records);
    //res.send("received get request on records")
  } catch (err) {
    next(err);
    //res.json({ success: false, message: err.message });
  }
};

export const getSingleRecord = async (req, res, next) => {
  "records/:id";
  "records/123";

  try {
    const id = req.params.id;
    const singleRecord = await RecordsCollection.findById(id);
    res.json({ success: true, record: singleRecord });
  } catch (err) {
    next(err);
    // const error = new Error("Record doesn't exist");
    // res.json({ success: false, message: err.message });
  }
  // res.send("received post request on records")
};

export const createRecord = async (req, res, next) => {
  // POST request to create record
  // res.send("received patch request on records")
  try {
    const record = new RecordsCollection(req.body);
    await record.save();
    res.json({ success: true, record });
  } catch (err) {
    next(err)
    //res.json({ success: false, message: err.message });
  }
};

export const updateRecord = async (req, res, next) => {
  // patch request /records/:id
  try {
    const id = req.params.id;
    const updatedRecord = await RecordsCollection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json({ success: true, record: updateRecord });
  } catch (err) {
    next(err)
    //res.json({ success: false, message: err.message });
  }
  //res.send("received delete request on records");
};

export const deleteRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingRecord = await RecordsCollection.findById(id);

    if (existingRecord) {
      const deleteStatus = await RecordsCollection.deleteOne({
        _id: existingRecord._id,
      });
      res.json({ success: true, status: deleteStatus });

    } else {
      throw new Error("record id doesn't exist");
    }
  } catch (err) {
    next(err)
    // res.json({ success: false, message: err.message });
  }
};

export default route;
