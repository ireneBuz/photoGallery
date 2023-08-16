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

})


module.exports = router