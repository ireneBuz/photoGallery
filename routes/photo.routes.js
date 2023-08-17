const express = require('express');
const router = express.Router();
const photoApi = require('../services/photo.service');
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');


router.get("/photo-index", (req, res) => {
    res.render("photos/photo-index")
})

router.post("/photo-index", (req, res, next) => {
    res.render("photos/photo-index")
})

router.get("/photo-black-gallery", (req, res, next) => {
    photoApi
        .getAllPhotos()
        .then(response => {
            const { data: allPhotosGallery } = response
            allPhotosGallery.splice(0, 10)
            allPhotosGallery.splice(12)

            res.render('photos/photo-black-gallery', { allPhotosGallery })
        })
        .catch(err => next(err))

})

router.get("/photo-color-gallery", (req, res, next) => {
    photoApi
        .getAllPhotos()
        .then(response => {
            const { data: allPhotosGallery } = response
            allPhotosGallery.splice(0, 22)
            allPhotosGallery.splice(12)

            res.render('photos/photo-color-gallery', { allPhotosGallery })
        })
        .catch(err => next(err))

})

router.get("/black-details/:id", (req, res, next) => {
    const { id: photo_id } = req.params

    photoApi
        .getOnePhoto(photo_id)
        .then(response => res.render("photos/black-details", { photo: response.data }))
        .catch(err => next(err))
})


router.get("/color-details/:id", (req, res, next) => {
    const { id: photo_id } = req.params

    photoApi
        .getOnePhoto(photo_id)
        .then(response => res.render('photos/color-details', { photo: response.data }))
        .catch(err => next(err))
})


router.post("/photo-black-gallery", (req, res, next) => {
    res.render("photos/photo-black-gallery")
})

router.get("/photo-color-gallery", (req, res, next) => {
    res.render("photos/photo-color-gallery")
})

router.post("/photo-color-gallery", (req, res, next) => {
    res.render("photos/photo-color-gallery")
})






module.exports = router