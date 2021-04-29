const express = require('express')
const ExpressError = require('./expressError')
const middleware = require('./middleWare')
const morgan = require('morgan')

const userRoutes = require('./userRoutes')

const app = express()

app.use(express.json())

// app.use(middleware.logger)

app.use(morgan('dev'))

app.use('/users', userRoutes)
app.get('/favicon.ico', function(req, res) {
    return res.sendStatus(204)
})

app.get('/secret', function(req, res, next) {
    return res.send("I LOVE YOU")
})

app.get('/private', middleware.checkForPassword, function(req, res, next) {
    return res.send("YOU HAVE REACHED THE PRIVATE PAGE. IT IS PRIVATE.")
})

// 404 Handler
app.use(function(req, res) {
    return new ExpressError("Not Found", 404)
})

app.use(function(err, req, res, next) {
    let status = err.status || 500

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
})

app.listen(3000, function() {
    console.log("YO, they listenin")
})