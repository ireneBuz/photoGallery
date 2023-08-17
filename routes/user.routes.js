//ruta perfil usuario
const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
// const uploaderMiddleware = require('../middleware/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model'); //nuevo
const Collection = require('../models/Collection.model');

//USER PROFILE

router.get("/user-profile", isLoggedIn, (req, res, next) => {

    const { _id: author } = req.session.currentUser

    Collection
        .find({ author })
        .then((collections) => {
            res.render('user/user-profile', { collections })
        })
        .catch(err => next(err))

})

//EDIT PROFILE

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

//DELETE PROFILE
router.post("/delete-profile", isLoggedIn, (req, res, next) => {

    const { userId } = req.params

    User
        .findByIdAndDelete(userId)
        .then(() => res.redirect("/"))
        .catch(err => next(err))

})


// router.post('/eliminar/:book_id', (req, res, next) => {

//     const { book_id } = req.params

//     Book
//         .findByIdAndDelete(book_id)
//         .then(() => res.redirect(`/libros/listado`))
//         .catch(err => next(err))
// })







// // USER CREATE COLLECTION

// router.get("/user/create-collection", isLoggedIn, (req, res, next) => {
//     res.render("user/create-collection")
// })

// router.post("/user/create-collection", (req, res, next) => {

//     const { Author, Bio, Camera, Description, Image } = req.body
//     Collection

//         .create({ Author, Bio, Camera, Description, Image })
//         .then(Collection => res.redirect(`/user/user-collection`))
//         .catch(err => next(err))
// })


// const userId = req.session.currentUser

// User
//     .findById(userId)
//     .then(user => res.render("user/user-profile", user))
//     .catch(err => next(err))


module.exports = router