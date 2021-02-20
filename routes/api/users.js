const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')


const User = require('../../models/User')

//Test route
router.get('/test', (req, res) => res.json({msg:"This is a test users route"}))

/**
 * @route POST /users/register
 * @access public
 * @desc Register users
 */
router.post("/register", (req, res) => {
    try{
        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    return res.status(400).json({email: "Email already exists!"})
                }
                else{
                    const avatar = gravatar.url(req.body.email, {
                        s: '200', //Size
                        r: 'pg', //Rating
                        d: 'mm' //Default
                    })

                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        avatar: avatar,
                        password: req.body.password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err
                            newUser.password = hash
                            newUser.save()
                                .then(user => res.json(user))
                                .catch(error => {
                                    console.log(error)
                                })
                        })
                    })
                }
            })
    }
    catch(e){
        console.error(e)
    }
})

/**
 * @route POST /users/login
 * @access public
 * @desc User Login / Return JWT
 */
router.post("/login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    //console.log(email, password)
    if(email && password){
        User.findOne({email})
            .then((user) => {
                if(!user){
                    return res.status(404).json({'error': 'User not found'})
                }

                bcrypt.compare(password, user.password)
                    .then(isMatched => {
                        if(isMatched){
                            //User Matched
                            //JWT Payload conatining user info
                            const payload = {
                                id: user.id, name: user.name, avatar: user.avatar
                            }
                            //Sign Token
                            jwt.sign(payload, keys.secret, {expiresIn:3600}, (err, token) => {
                                if(token){
                                    return res.json({
                                        'status': 'success',
                                        'token': 'Bearer '+token
                                    }) 
                                }
                            })
                        }
                        else{
                            res.status(404).json({'error': 'Incorrect Password given'})
                        }
                    })
            })
    }
    else{
        return res.status(400).json({'error': "Either Email or Password missing!"})
    }
})

/**
 * @route GET /users/current
 * @access private
 * @desc Return logged in user (verified by passport)
 */
router.get('/current', passport.authenticate('jwt', {session:false}), (req, res) => {
    const user = {
        id: req.user.id, name: req.user.name, email: req.user.email
    }
    return res.json(user)
})

module.exports = router