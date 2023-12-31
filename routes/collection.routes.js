const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const uploaderMiddleware = require('../middlewares/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model');
const Collection = require('../models/Collection.model');

router.get("/collection", isLoggedIn, (req, res, next) => {

    Collection
        .find()
        .populate('author')
        .then((collections) => {
            res.render('collection/index-collections', { collections })
        })
        .catch(err => next(err))

})

router.get("/collection/:id/user-collection", isLoggedIn, (req, res, next) => {
    const user = req.session.currentUser
    const { id: author } = req.params


    Collection
        .find({ author })
        .then((collections) => { res.render('collection/one-user-collection', { collections, user }) })
        .catch(err => next(err))

})


router.get("/collection/create-collection", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser

    res.render('collection/create-collection')
})


router.post("/collection/create-collection", uploaderMiddleware.single('newPhotoCollection'), (req, res) => {

    const { title, description, camera } = req.body
    const newDocument = { description, camera }
    newDocument.author = req.session.currentUser._id

    if (req.file) {
        const { path: newPhotoCollection } = req.file
        console.log('aqui est al aimagen---', newPhotoCollection)

        newDocument.images = {
            title: title,
            url: newPhotoCollection
        }
    }

    Collection
        .create(newDocument)
        .then(() => res.redirect('/collection'))
        .catch(err => console.log(err))

})


router.get("/collection/create-collection", (req, res, next) => {

    res.render("collection/create-collection");
})


router.post("/collection/create-collection", (req, res, next) => {

    const { _id: author } = req.session.currentUser

    const { camera, description } = req.body

    Collection
        .create({ author, camera, description })
        .then(() => res.redirect("/collection/index-collections"))
        .catch(err => next(err))
})


router.get("userId", (req, res, next) => {

    const { userId } = req.params

    Collection
        .findById(userId)
        .then(() => res.render("/collection/index-collections"))
        .catch(err => next(err))

})


router.post("userId", (req, res, next) => {

    const { author, camera, description } = req.body
    const { userId } = req.params

    Collection
        .findByIdAndUpdate(userId, { author, camera, description })
        .then(() => res.redirect("/collection/index-collections"))
        .catch(err => next(err))
})



router.get("/user/user-profile", isLoggedIn, (req, res) => {

    const { _id: userId } = req.session.currentUser

    Collection
        .findById(userId)
        .then((collections) => {
            res.render('collection/index-collections', { collections, userId })

        })
        .catch(err => next(err))
})


router.post('/user/user-profile', (req, res) => {

    const { userId } = req.params
    const { author, camera, description } = req.body

    Collection
        .findByIdAndUpdate(userId, { author, camera, description })
        .then(() => res.redirect(`/user/user-profile${userId}`))
        .catch(err => console.log(err))
})


module.exports = router