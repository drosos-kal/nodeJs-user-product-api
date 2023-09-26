const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
const cors = require('cors')
const user = require('./routes/user.route')
const product = require('./routes/product.route')
const user_products = require('./routes/user-product.route')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger')
require('dotenv').config()

// Middleware to parse incoming JSON requests
app.use(express.json())

// Middleware to parse incoming URL-encoded form data
app.use(express.urlencoded({extended: false}))

// Middleware for handling Cross-Origin Resource Sharing (CORS)    
app.use(cors({
    // origin: '*'
    origin: ['https://www.example.com', 'http://localhost:8000']
}))

/**
 * Connection to MongoDB
 */
mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log('Connection with database established')},
        err => {console.log('Failed to connect to MongoDB', err)}
    )

// Displays static files from 'files' directory
app.use('/', express.static('files'))

// API routing for user data
app.use('/api/users', user)

// API routing for user-product relation
app.use('/api/users-products', user_products)

// Sets up Swagger API Documentation
app.use('/api-docs',
swaggerUI.serve,
swaggerUI.setup(swaggerDocument.options)
)

/**
 * Starts server
 * @param port - The port the server listens at
 */
app.listen(port, () => {
    console.log('Listening on port 3000')
})