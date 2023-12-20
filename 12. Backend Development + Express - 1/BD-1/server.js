//Server Instantiate
const express = require('express');
const app = express();

//used to parse req.body  in express -> PUT or POST
const bodyParser = require('body-parser');

//specifically parse JSON data and add it to the request.Body object
app.use(bodyParser.json());

//activate the server at 3000
app.listen(3000, () => {
    console.log("Server Started at port no. 3000");
});

//GET request
app.get("/", (req, res) => {
    res.send("Hello")
});

//POST request
app.post("/api/cars", (req, res) => {
    const {name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Successfully");
});

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myDatabase", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
.then(()=> {console.log("Connection Successful")})
.catch((error) => {console.log("Received an error")});