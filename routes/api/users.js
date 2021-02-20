const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Loading User Model
const User = require('../../models/User')

const { default: validator } = require('validator')
//Test route
router.get('/test', (req, res) => res.json({msg:"This is a test users route"}))

/**
 * @route POST /users/register
 * @access public
 * @desc Register users
 */
router.post("/register", (req, res) => {
    try{
        //Loading Register validation module
        const validateRegisterInput = require('../../validation/register')

        let {errors, isValid} = validateRegisterInput(req.body)

        if(!isValid){
            return res.status(400).json(errors)
        }

        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    errors.email = "Email already exists!";
                    return res.status(400).json(errors)
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
    
    //Loading Login validation module
    const validateLoginInput = require('../../validation/login')

    let {errors, isValid} = validateLoginInput(req.body);
    if(isValid){
        User.findOne({email})
            .then((user) => {
                if(!user){
                    errors.email = "User with given email not found";
                    return res.status(404).json(errors)
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
        return res.status(400).json(errors)
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