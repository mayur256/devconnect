const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('User')
const keys = require('./keys')

const options = {}
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secret

module.exports = passport => {
    passport.use(new JWTStrategy(options, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(user => {
                if(user){
                    done(null, user)
                }
                else{
                    done(null, false)
                }
            })
            .catch(error => console.log(error))
    }))
}