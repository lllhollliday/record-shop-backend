import express from "express"

const route = express.Router()


// Route GET 
route.get("/", (req,res) => {
    //res.send("received get request on shop")
    res.json({"products": ["product1", "product2"]})
})

// Route POST 
route.post("/", (req,res) => {
    res.send("received post request on shop")
})

// Route PATCH 
route.patch("/:id", (req,res) => {
    res.send("received patch request on shop")
})

// Route DELETE
route.delete("/:id", (req,res) => {
    res.send("received delete request on shop")
})

// Important !!!
export default route
