require('dotenv').config()
const { response } = require('express');
// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const methodOverride = require('method-override')
const session = require('express-session')
const app = express();
const productsRatingsController = require('./controllers/ProductRatingsController')
const usersController = require('./controllers/UsersController')
const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://admin:Qwerty@cluster1.rep1v.gcp.mongodb.net/test?retryWrites=true&w=majority'

mongoose.set('useFindAndModify', false)
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(response => {

    console.log("DB connection is successful")
    // =======================================
    //              LISTENER
    // =======================================
    app.listen(port, () => {
      console.log(`Biscoff Bakery app listening on port: ${port}`)
    })

  })


const port = 3002;

const productsController = require('./controllers/productsController');
const ratingsController = require('./controllers/productsRatingController')
const ProductModel = require('./models/products');

// set template engine to use
app.set('view engine', 'ejs')

// tell Express app where to find our static assets
app.use(express.static('public'))

// tell Express app to make use of the imported method-override library
app.use(methodOverride('_method'))

app.use(express.urlencoded({
  extended: true
}))

app.use(session({
  secret: process.env.SESSION_SECRET,
  name: "app_session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 3600000 } // 3600000ms = 3600s = 60mins, cookie expires in an hour
}))
// =======================================
//              ROUTES
// =======================================

// index route
app.get('/products', productsController.listProducts)

// new route
app.get('/products/new', productsController.newProduct)

// show route
app.get('/products/:slug', productsController.showProduct)

// create route
app.post('/products', productsController.createProduct)

// edit route
app.get('/products/:slug/edit', productsController.showEditForm)

// update route
app.patch('/products/:slug', productsController.updateProduct)

// delete route
app.delete('/products/:slug', productsController.deleteProduct)

// ratings form
app.get('/products/:slug/ratings/new', ratingsController.newProductRatingForm)

// create ratings
app.post('/products/:slug/ratings', ratingsController.createProductRating)


/**
 * PRODUCT RATINGS ROUTES
 */

// product rating new route
app.get('/products/:slug/ratings/new', productsRatingsController.newProductRatingForm)

// product rating create route
app.post('/products/:slug/ratings', productsRatingsController.createProductRating)


/**
 * USER ON-BOARDING ROUTES
 */

// user registration form route
app.get('/users/register', usersController.showRegistrationForm)

// user registration
app.post('/users/register', usersController.register)

// user login form route
app.get('/users/login', usersController.showLoginForm)

// user login route
app.post('/users/login', usersController.login)
