const mongoose = require('mongoose')
const productData = require('../models/bakedgoods')
const ProductModel = require('../models/products')

const mongoURI = 'mongodb+srv://admin:Qwerty@cluster1.rep1v.gcp.mongodb.net/test?authSource=admin&replicaSet=atlas-vh6esw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(response => {
        console.log('MongoDB connection successful')
    })
    .then(response => {
        ProductModel.insertMany(productData)
            .then(insertResponse => {
                console.log('Data seeding successful')
            })
            .catch(insertErr => {
                console.log(insertErr)
            })
            .finally(() => {
                mongoose.disconnect()
            })
    })
    .catch(err => {
        console.log(err)
    })