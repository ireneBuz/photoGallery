const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const uploaderMiddleware = require('../middlewares/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model');
const Collection = require('../models/Collection.model');

router.get("/collection", isLoggedIn, (req, res) => {

    Collection
        .find()
        .then((collections) => {
            res.render('collection/index-collections', { collections })

        })
})

router.get("/collection/create-collection", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser

    res.render('collection/create-collection')
})

router.post("/collection/create-collection", uploaderMiddleware.single('newPhotoCollection'), (req, res) => {
    const { description, camera } = req.body
    const newDocument = { description, camera }
    newDocument.images = { title: 'prueba' }
    newDocument.author = req.session.currentUser._id

    if (req.file) {
        const { path: newPhotoCollection } = req.file
        newDocument.images.url = newPhotoCollection
    }

    Collection
        .create(newDocument)
        .then(() => res.redirect('/collection'))
        .catch(err => console.log(err))

})

router.get("/collection/create-collection", (req, res, next) => {

    res.render("collection/create-collection");
});

router.post("/collection/create-collection", (req, res, next) => {
    //sacar el id del usuario conectado y asociarselo a author
    const userId = req.session.currentUser._id

    const { camera, description } = req.body

    Collection
        .create({ author: userId, camera, description })
        .then(() => res.redirect("/collection/index-collections"))
        .catch(err => next(err))
})

router.get("userId", (req, res, next) => {
    const { userId } = req.params
    Collection
        .findById(userId)
        .then(() => res.render("/collection/index-collections"))
        .catch(err => next(err))

});

router.post("userId", (req, res, next) => {
    const { author, camera, description } = req.body
    const { userId } = req.params
    Collection
        .findByIdAndUpdate(userId, { author, camera, description })
        .then(() => res.redirect("/collection/index-collections"))
        .catch(err => next(err))
})


//fotos en perfil por id
router.get("/user/user-profile", isLoggedIn, (req, res) => {
    const userId = req.session.currentUser._id

    Collection
        .findById({ _id: userId })
        .then((collections) => {
            res.render('collection/index-collections', { collections, userId })

        })
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