//ruta perfil usuario
const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
// const uploaderMiddleware = require('../middleware/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model'); //nuevo

//USER PROFILE

router.get("/user/user-profile", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser

    User
        .findById(userId)
        .then(user => res.render("user/user-profile", user))
        .catch(err => console.log(err))
})

//EDIT PROFILE

router.get("/user/edit-profile", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser

    User
        .findById(userId)
        .then(user => res.render("user/edit-profile", user))
        .catch(err => console.log(err))
})

router.post("/user/edit-profile", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser
    const { username, email } = req.body

    User
        .findByIdAndUpdate(userId, { username, email })
        .then(() => {
            res.redirect("/user/user-profile")
        })
        .catch(err => console.log(err))
})

// PHOTOGRAPHS USER

// router.get("/user/create", isLoggedIn, (req, res) => {

//     const userId = req.session.currentUser

//     User
//         .findById(userId)
//         .then(user => res.render("user/user-profile", user))
//         .catch(err => console.log(err))
// })

module.exports = router