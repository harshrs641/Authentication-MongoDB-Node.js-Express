const express = require("express")
const actions = require("../methods/actions")
const router = express.Router()


// Adding New User
router.post('/addUser', actions.addNew)

//Authenticating user with email and password and then give them an authentication token
router.post("/authenticateUser", actions.authenticate)


// getting user details from auth token
router.get("/userDetails", actions.getUserInfo)


module.exports = router