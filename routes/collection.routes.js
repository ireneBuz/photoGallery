const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const uploaderMiddleware = require('../middlewares/uploader.middleware');
const router = express.Router();
const User = require('../models/User.model'); //nuevo
const Collection = require('../models/Collection.model');


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
        .then(() => res.send('done'))
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
        .then(() => res.redirect("/collection/create-collection"))
        .catch(err => next(err))
})

router.get("/:id/edit", (req, res, next) => {
    const { id } = req.params
    Collection
        .findById(id)
        .then(() => res.render("/collection/create-collection"))
        .catch(err => next(err))

});

router.post("/:id/edit", (req, res, next) => {
    const { author, camera, description } = req.body
    const { id } = req.params
    Collection
        .findByIdAndUpdate(id, { author, camera, description })
        .then(() => res.redirect("/collection/create-collection"))
        .catch(err => next(err))
})








module.exports = router