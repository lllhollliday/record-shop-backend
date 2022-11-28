import mongoose from "mongoose";

const Schema = mongoose.Schema

const recordSchema = new Schema({
    title: {type:String, required:true},
    author: {type:String, required:true},
    year: {type:Number, required:true},
    img: {type:String, required: true},
    price: {type: Number, required: true},
})

// create collection and store such type of documents in that collection
const RecordsCollection = mongoose.model("records", recordSchema)


export default RecordsCollection