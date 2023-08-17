
const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
// const uploaderMiddleware = require('../middleware/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model'); //nuevo
const Collection = require('../models/Collection.model');



router.get("/user-profile", isLoggedIn, (req, res, next) => {
    const user = req.session.currentUser
    const { _id: author } = req.session.currentUser

    Collection
        .find({ author })
        .then((collections) => {
            res.render('user/user-profile', { collections, user })
        })
        .catch(err => next(err))

})

router.get("/edit-profile", isLoggedIn, (req, res, next) => {

    const { _id: userId } = req.session.currentUser

    User
        .findById(userId)
        .then(user => res.render("user/edit-profile", user))
        .catch(err => next(err))
})

router.post("/edit-profile", isLoggedIn, (req, res, next) => {

    const { _id: userId } = req.session.currentUser
    const { username, email } = req.body

    User
        .findByIdAndUpdate(userId, { username, email })
        .then(() => {
            res.redirect("/user/user-profile")
        })
        .catch(err => next(err))
})

router.post("/delete-profile", isLoggedIn, (req, res, next) => {

    const { userId } = req.params

    User
        .findByIdAndDelete(userId)
        .then(() => res.redirect("/"))
        .catch(err => next(err))

})

module.exports = router