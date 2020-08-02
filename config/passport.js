// Created a strategy 
// Our strategy is to get user details using authentication toekn

var jwtStrategy = require("passport-jwt").Strategy
var extractJwt = require("passport-jwt").ExtractJwt

var user = require("../models/user")
var config = require("./dbconfig")

module.exports = function (passport) {
    var opts = {}
    opts.secretOrKey = config.secret
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt")
    passport.use(new jwtStrategy(opts, function (jwtPayload, done) {
        user.find({ id: jwtPayload.id }, function (error, user) {
            if (error) 
            {
                return done(error, false)
            } 
            if (!user) 
            {
                return done(null, false)
            }
            else 
            {
                return done(null, user)
            }

        })// Checking with token if that token has user valid user or not and if valid get the user

    }))

}