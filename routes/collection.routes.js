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
            // res.send(collections)
            res.render('collection/index-collections', { collections })
        })
        .catch(err => next(err))

})

//endpoint que reciba el id del boton ver colecion, buiscar en bbdd ese id y renderizar otra vista con las fotos de esa collecion y otros datos de la cole
router.get("/collection/one-user-collection", (req, res, next) => {
    const { _id: userId } = req.session.currentUser

    Collection
        .findById(userId)
        .then((user) => res.render(`collection/one-user-collection`, user))
        .catch(err => next(err))

});


router.get("/collection/create-collection", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser

    res.render('collection/create-collection')
})


router.post("/collection/create-collection", uploaderMiddleware.array('newPhotoCollection'), (req, res) => {

    const { title, description, camera } = req.body
    const newDocument = { title, description, camera }
    newDocument.images = { title: 'prueba' }
    newDocument.author = req.session.currentUser._id


    if (req.files) {
        const { path: newPhotoCollection } = req.files
        newDocument.images.url = newPhotoCollection
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