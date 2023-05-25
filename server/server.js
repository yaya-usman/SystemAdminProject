const express = require('express');
const mongoose = require('mongoose');
const IP = require('./db/models/ipModel');
const axios = require('axios');
const cors = require('cors');
const moment = require("moment");
const IPP = require('ip');
require('dotenv').config();


const app = express();


app.use(express.json());
app.use(cors())


const sendAPIRequest = async (ipAddress) => {
    const apiResponse = await axios.get(process.env.ABSTRACT_GEO_URL + "&ip_address=" + ipAddress);
    return apiResponse.data;
}

// app.get('/', async (req, res) => {
//     const ipAddress = IPP.address();
//     const ipAddressInformation = await axios.get(process.env.ABSTRACT_GEO_URL);
//     console.log(ipAddressInformation)
// })


app.get('/ipRecords', async (req, res) => {
    // const test = req.header('x-forwarded-for');

    console.log(req.headers)
    try {
        const ipAddressInformation = await axios.get(process.env.ABSTRACT_GEO_URL);
        const {ip_address, city, country, flag}= ipAddressInformation.data

        // add to the database
        await IP.create({ipAddress: ip_address, city, country, flag: flag.png})

        // fetch from db and format it and return the result
        const result =  await IP.find({})

        const formatedResult = result.map((obj) => {
            return {...obj._doc, timeCreated: moment(obj._createdAt).add(3, 'hours').format("DD.MM.YYYY hh:mm:ss a")}
        })

        res.status(200).send(formatedResult);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({error: error.message});
    }

})


mongoose.connect(process.env.MONGO_DB_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
      
}).then(() => {
    console.log("DB connected");

    app.listen('5000', () => {
        console.log("app listening at port 5000")
    })
}).catch((error) => console.error(error))
