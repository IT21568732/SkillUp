const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const Customer = require("./models/customerModel")

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const PORT = 5000;

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    
    app.listen(PORT, () => {
        console.log(`Customer_ms---Up and Running on port ${PORT}`);
    });
    console.log('MongoDB connected')
  })
  .catch(error => console.error('Failed to connect to MongoDB:', error));

//create course
app.post("/customer",async(req,res)=>{
    console.log(req.body)
    try {
        const {name,email} = req.body;

        const customer = await Customer.findOne({email});
        if(!customer){
            const newCustomer = new Customer({name,email}); 
            await newCustomer.save();
        
            res.status(201).send('Customer created successfully');
        }else{
            res.status(409).send('Customer already exists.');
        }
        

    } catch (error) {
        console.log(error)
        res.status(500).send('Error Customer creation.');
    }
});

//get all the courses
app.get("/customers", async (req, res) => {
    try {
        const customers = await Customer.find();

        res.status(200).send(customers);

    } catch (error) {
        res.status(500).send( 'Unable to get customers');
    }
});

//get course by id
app.get("/customer/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);

        //authenticate the generated code with course code

        if (customer) {
            res.status(200).send(customer);
        } else {
            res.status(404).send("customer not found");
        }

    } catch (error) {
        res.status(500).send( 'Unable to get the customer');
    }
});

//delete course by id
app.delete("/customer/:id", async (req, res) => {
    //res.send(req.params.id);
    try {

        const customerID = req.params.id;
        const deletecustomer = await Customer.findOneAndDelete({_id:customerID});

        if (deletecustomer) {
            res.status(200).send("Customer deleted successfully.");
        } else {
            res.status(404).send("Customer not found");
        }

    } catch (error) {
        res.status(500).send( 'Unable to delete the Customer');
    }
});

//main end point
app.get('/',(req,res)=>{
    res.send("main endpoint");
})

