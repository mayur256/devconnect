const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

//Load post model
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

//Load the validators
const validatePostInput = require('../../validation/post');
//Test route
router.get('/test', (req, res) => res.json({msg:"This is a test post route"}))

/**
 * @router POST posts/create
 * @desc create a post 
 * @access private
 */
router.post('/create', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    if(!isValid){
        return res.status(400).json({hasError: !isValid, errors});
    }
    else{
        const newPost = new Post({
            text: req.body.text,
            name: req.user.name,
            avatar: req.user.avatar,
            user: req.user.id
        });
        Profile.findOne({user: req.user.id}).then(profile => {
            if(profile){
                newPost.save().then(post => res.json({hasError: false, post}));
            }
            else{
                let errors = {text: 'You need to create a profile first before making any posts.'}
                res.status(400).json({hasError: true, errors});
            }
        })
        
    }
});

/**
 * @route /all
 * @desc get all posts
 * @access public
 */
router.get('/all', passport.authenticate('jwt', {session: false}), (req, res)=>{
    Post.find().sort({created_at: -1}).then(posts => {
        res.json({hasError: false, posts})
    }).catch((err) => res.status(400).json({hasError: true, error: 'No Posts found!'}))
})

/**
 * @route /get/id
 * @desc get a post item
 * @access public
 */
router.get("/get/:id", (req, res)=>{
    Post.findOne({_id: req.params.id}).then(post => {
        res.json({hasError: false, post});
    }).catch(err => res.status(400).json({hasError: true, error: 'No post found'}));
})

/**
 * @route /delete/id
 * @desc to delete a post
 * @access private
 */
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            Post.findById(req.params.id).then(post => {
                //Check if logged in user is the post owner
                if(profile.user.toString() !== req.user.id){
                    return res.status(401).json({error: 'Unauthorized'});
                }
                else{
                    post.remove().then(() => res.json({hasError: false, status: 'Sucessfully deleted!'}))
                }
            }).catch(() => res.json({error: 'Post not found'}))
        }
    })
});

/**
 * @route /like/id
 * @desc to attach like to a post
 * @access private
 */
router.post("/like/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            Post.findById(req.params.id).then(post => {
                if(post && post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                    return res.status(400).json({hasError: true, error: "User has already liked this post"});
                }
                else if(post){
                    //add this user id to likes array
                    post.likes.unshift({user: req.user.id})
                    post.save().then(post => res.json({hasError: false, post}))
                }
            })
            .catch(() => res.status(400).json({hasError: true, error:'Cannot find given post'}))
        }
        else{
            res.status(400).json({hasError: true, error: 'Cannot find profile'});
        }
    }).catch(() => res.status(400).json({hasError: true, error: 'Cannot find profile'}));
});

/**
 * @route /dislike/id
 * @desc to detach like from a post
 * @access private
 */
 router.post("/dislike/:id", passport.authenticate("jwt", {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile){
            Post.findById(req.params.id).then(post => {
                if(post && post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                    return res.status(400).json({hasError: true, error: "You have not liked this post."});
                }
                else if(post){
                    //remove the user id  from likes array
                    let removeIndex = post.likes.findIndex(el => el.user.toString() === req.user.id);
                    post.likes.splice(removeIndex, 1);
                    post.save().then(post => res.json({hasError: false, post}))
                }
            })
            .catch(() => res.status(400).json({hasError: true, error:'Cannot find given post'}))
        }
        else{
            res.status(400).json({hasError: true, error: 'Cannot find profile'});
        }
    }).catch(() => res.status(400).json({hasError: true, error: 'Cannot find profile'}));
});

/**
 * @route POST /comments/post_id
 * @desc Add a comment to a Post
 * @access private
 */
router.post("/comments/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    if(!isValid){
        return res.status(400).json({hasError: !isValid, errors});
    }
    Post.findById({_id: req.params.id})
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.user.name,
                avatar: req.user.avatar,
                user: req.user.id
            }

            Profile.findOne({user: req.user.id}).then(profile => {
                if(profile){
                    post.comments.unshift(newComment);

                    post.save().then(post => res.json({hasError: false, post}));
                }
                else{
                    let errors = {text: 'You need to create a profile before commenting on a post'}
                    res.status(400).json({hasError: true, errors});
                }
            })
            .catch(err => {
                res.status(500).json({hasError: true, errors: 'Something went wrong'})
            })
        })
        .catch(err => res.status(400).json({hasError: true, error: "Post not found"}));
})

/**
 * @route /comments/post_id/delete/comment_id
 * @desc To delete a comment on a post
 * @access private
 */
router.delete("/comments/:post_id/delete/:comment_id", passport.authenticate("jwt", {session: false}),
    (req, res) => {
        Post.findById({_id: req.params.post_id})
            .then(post => {
                if(post && post.comments.filter(el => el._id.toString() === req.params.comment_id).length > 0){
                    const removeIndex = post.comments.findIndex(el => el._id.toString() === req.params.comment_id);
                    post.comments.splice(removeIndex, 1);
                    post.save().then(post => res.json({hasError: false, post}));
                }
                else{
                    res.status(400).json({hasError: true, error: "Comment not found"});
                }
            })
            .catch(err => res.status(400).json({hasError: true, error: "Some error occured. Please contact support."}))
    }
);

module.exports = router