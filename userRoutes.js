const express = require('express')
const router = new express.Router()

const USERS = [
    { id: 1, username: "goodboycp" },
    { id: 2, username: "bethbot" },
    { id: 3, username: "hankthecat" }
]

/*
These routes are going to be prefixed with 'users' in our app.js.
Here, we treat them as if it said app.get('/users/') or app.get('/users/:id')
*/
router.get('/', function(req, res) {
    res.json({ users: USERS})
})

router.get('/:id', function(req, res) {
    const user = USERS.find(u => u.id === +req.params.id)
    res.json({ user })
})

// then we export so we can grab in our app.js file 
module.exports = router