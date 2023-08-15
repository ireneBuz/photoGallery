//ruta perfil usuario
const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
// const uploaderMiddleware = require('../middleware/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model'); //nuevo
const Collection = require('../models/Collection.model');

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

//DELETE PROFILE
router.post("/user/delete-profile", isLoggedIn, (req, res) => {

})






// // USER CREATE COLLECTION

// router.get("/user/create-collection", isLoggedIn, (req, res) => {
//     res.render("user/create-collection")
// })

// router.post("/user/create-collection", (req, res) => {

//     const { Author, Bio, Camera, Description, Image } = req.body
//     Collection

//         .create({ Author, Bio, Camera, Description, Image })
//         .then(Collection => res.redirect(`/user/user-collection`))
//         .catch(err => console.log(err))
// })


// const userId = req.session.currentUser

// User
//     .findById(userId)
//     .then(user => res.render("user/user-profile", user))
//     .catch(err => console.log(err))


module.exports = router