const ExpressError = require('./expressError')

function logger(req, res, next) {
    console.log(`RECIEVED A ${req.method} request to ${req.path}`)
    return next()
}

function checkForPassword(req, res, next) {
    try {
        if (req.query.password !== 'monkeybreath') {
            throw new ExpressError("Missing or incorrect password", 403)
        } else {
            return next()
        }
    } catch(e) {
        // If you pass a parameter into 'next', it will
        // always be treated as an error.
        return next(e)
    }
}

module.exports = { logger, checkForPassword }