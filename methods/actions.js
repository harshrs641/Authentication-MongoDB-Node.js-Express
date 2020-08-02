var user = require("../models/user")
var jwt = require("jwt-simple")
var config = require("../config/dbconfig")

//Collection of  functions
var functions = {
    //To add user
    addNew: function (req, res) {
        if ((!req.body.name) || (!req.body.password))
            res.json({ success: false, msg: "Enter all field" })
        else {
            var newUser = user({
                name: req.body.name,
                password: req.body.password
            })
            newUser.save(function (err, newUser) {
                console.log("eeerrrrott" + err);
                if (err) {
                    res.json({ success: false, msg: "Failed to save" })
                }
                else {
                    res.json({ success: true, msg: "Saved Successfully" })

                }
            })
        }
    },

    //To authenticated the existing user
    authenticate: function (req, res) {
        user.findOne({
            email: req.body.email
        },
            function (error, user) {
                if (error)
                    throw error
                if (!user) {
                    res.send({
                        success: false,
                        msg: "Authentication Failed, User not found"
                    })
                } else {
                    user.comparePassword(req.body.password, function (err, isMatched) {
                        if (isMatched && !err) {
                            var token = jwt.encode(user, config.secret) // Generating the token to the authenticated user
                            return res.json({
                                success: true,
                                msg: "User Authenticated successfully",
                                token: token
                            })
                        }
                        else {
                            return res.json({ success: false, msg: "User not authenticated" })
                        }

                    })
                }

            })

    },

    //To get user details from token
    getUserInfo: function (req, res) {
        if (req.headers.token || req.headers.token.split(" ")[0] == "Bearer") {
            var token = req.headers.token
            var decodedToken = jwt.decode(token, config.secret)
            return res.json({
                success: true,
                data: {
                    email: decodedToken.email
                },
                msg: "Valid User"
            })
        }
        else
            return res.json({ success: false, data: [], msg: "No headers" })

    }

}

module.exports = functions