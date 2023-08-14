const express = require('express');
const router = express.Router();
const photoApi = require('../services/photo.service')



//ruta índice colecciones blackWhite/color
router.get("/photos/photo-index", (req, res) => {
    res.render("photos/photo-index")
})

router.post("/photos/photo-index", (req, res, next) => {
    res.render("photos/photo-index")
})

//ruta black and white colection
router.get("/photos/photo-black-gallery", (req, res, next) => {
    // res.render("photos/photo-black-gallery")

    photoApi
        .getAllPhotos()
        .then(response => {
            const allPhotosGallery = response.data
            res.render('photos/photo-black-gallery', { allPhotosGallery })
        })
        .catch(err => console.log(err))

})

router.post("/photos/photo-black-gallery", (req, res, next) => {
    res.render("photos/photo-black-gallery")
})




//ruta color collection
router.get("/photos/photo-color-gallery", (req, res, next) => {
    res.render("photos/photo-color-gallery")
})

router.post("/photos/photo-color-gallery", (req, res, next) => {
    res.render("photos/photo-color-gallery")
})








module.exports = router