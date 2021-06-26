const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load Models
const Profile = require('../../models/Profile')
const User = require('../../models/User')

//Load Validation module for profile
const validateProfileInput = require('../../validation/profile');

//Load Validation module for experience
const validateExperienceInput = require('../../validation/experience');

//Load Validation module for education
const validateEducationInput = require('../../validation/education');

//Test route
router.get('/test', (req, res) => res.json({msg:"This is a test profile route"}))

/**
 * @route GET /profile
 * @desc get current user profile
 * @access private
 */
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = {}

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if(!profile){
                errors.noprofile = "There is no profile associated with this user";
                return res.status(404).json({hasError: true,errors})
            }
            res.json({hasError: false, profile});
        })
        .catch(err => res.status(400).send(err))
})

/**
 * @route GET /profile/handle/:handle
 * @desc get user profile by handle
 * @access public
 */
router.get("/handle/:handle", (req, res) => {
    let errors = {};
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "No Profile found";
                return res.status(404).json(errors)
            }
            else{
                res.json(profile)
            }
        })
        .catch(err => res.status(404).json(err))
})

/**
 * @route GET /profile/user/:user_id
 * @desc get user profile by user id
 * @access public
 */
router.get("/user/:user_id", (req, res) => {
    let errors = {};
    Profile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.noprofile = "No Profile found";
                return res.status(404).json(errors)
            }
            else{
                res.json(profile)
            }
        })
        .catch(err => res.status(404).json(err))
})

/**
 * @route POST /profile
 * @desc create/update user profile
 * @access private
 */
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const inputs = {
        user: req.user.id,
        handle: req.body.handle ? req.body.handle : '',
        website: req.body.website ? req.body.website : '',
        location: req.body.location ? req.body.location : '',
        bio: req.body.bio ? req.body.bio : '',
        status: req.body.status ? req.body.status : '',
        gitHubUserName: req.body.gitHubUserName ? req.body.gitHubUserName : '',
        company: req.body.company ? req.body.company : '', 
        social: {}
    }

    if(typeof req.body.skills !== "undefined"){
        inputs.skills = req.body.skills
    }
    else{
        inputs.skills = ''
    }

    inputs.social.youtube = req.body.youtube ? req.body.youtube : ''
    inputs.social.facebook = req.body.facebook ? req.body.facebook : ''
    inputs.social.instagram = req.body.instagram ? req.body.instagram : ''
    inputs.social.linkedin = req.body.linkedin ? req.body.linkedin : ''
    inputs.social.twitter = req.body.twitter ? req.body.twitter : ''
    
    let {errors, isValid} = validateProfileInput(inputs);

    if(!isValid){
        return res.status(400).json({hasError: !isValid, errors});
    }

    if(inputs.skills){
        inputs.skills = inputs.skills.split(',');
    }
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile){
                //if profile exists then update the profile
                Profile.findOneAndUpdate({user: req.user.id}, {$set: inputs}, {new: true})
                    .then(profile => res.json({hasError: false, profile}))
            }
            else{
                //if profile does not exists then create one
                //Check if handle exists
                Profile.findOne({handle: req.body.handle})
                    .then(profile => {
                        if(profile){
                            //set error profile already exists
                            errors.handle = "Profile with this handle already exists"
                            return res.status(400).json({hasError: true, errors})
                        }

                        //save the profile
                        new Profile(inputs).save().then(profile => res.json({hasError: false, profile}))
                    })
            }
        })
});

/**
 * @route /experience/store
 * @desc to add experience data to profile
 * @access private
 */
router.post('/experience/store', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateExperienceInput(req.body);
    if(!isValid){
        return res.status(400).json({hasError: !isValid, errors});
    }
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location0,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json({hasError: false, profile}));
        }
    })
});

/**
 * @route /education/store
 * @desc to add education data to profile
 * @access private
 */
router.post('/education/store', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateEducationInput(req.body);
    if(!isValid){
        return res.status(400).json({hasError: !isValid, errors});
    }
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                field: req.body.field,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };
            
            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json({hasError: false, profile}));
        }
    })
});

/**
 * @route DELETE experience/delete/id
 * @desc Delete experience from profile
 * @access private
 */
router.delete("/experience/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        //get index of the experience to be removed
        const removeIndex = profile.experience.map(item => item.id)
            .indexOf(req.params.id)

        //remove the experience from array
        profile.experience.splice(removeIndex, 1)

        profile.save().then(profile => res.json({hasError: false, profile}))
        .catch(err => res.status(500).json({hasError: true, err}))
    })
});

/**
 * @route DELETE education/delete/id
 * @desc Delete experience from profile
 * @access private
 */
router.delete("/education/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        //get index of the experience to be removed
        const removeIndex = profile.education.map(item => item.id)
            .indexOf(req.params.id)

        //remove the experience from array
        profile.education.splice(removeIndex, 1)

        profile.save().then(profile => res.json({hasError: false, profile}))
        .catch(err => res.status(500).json({hasError: true, err}))
    })
});

/**
 * @router /delete
 * @desc to delete a profile and its corresponding user
 * @access private
 */
router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
    if(req.user){
        Profile.findOneAndRemove({user: req.user.id}, {useFindAndModify: false}).then(() => {
            User.findOneAndRemove({_id: req.user.id}, {useFindAndModify: false}).then(() => {
                res.json({hasError: false, status: 'Delete success'})
            })
        })
    }
})

module.exports = router