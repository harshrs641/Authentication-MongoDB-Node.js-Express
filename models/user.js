var mongoose = require("mongoose")
var schema = mongoose.Schema
var bcrypt = require("bcrypt")


var userSchema = new schema(
    {
        email:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true
        }
    })




// to encrypt the password we need a prehooks
//encrypting the password before saving it to mongo
userSchema.pre("save", function (next) {
    var user = this;
    if (this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash;
                next()
            })

        })
    }
    else {
        return next()
    }
})


//Create methods to call on this schema
userSchema.methods.comparePassword = function (pass, cb) {
    bcrypt.compare(pass, this.password, function (err, isMatched) {
        if (err) {
            return cb(err)
        } else {
            cb(null, isMatched)
        }
        return cb()

    })// Checking the passed password  matching the encrypted stored password

}




module.exports = mongoose.model("user", userSchema)