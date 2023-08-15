const express = require('express');
const router = express.Router();
const photoApi = require('../services/photo.service');
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');



//ruta índice colecciones blackWhite/color
router.get("/photos/photo-index", (req, res) => {
    res.render("photos/photo-index")
})

router.post("/photos/photo-index", (req, res, next) => {
    res.render("photos/photo-index")
})

//ruta get - galeria fotos-BLACK AND WHITE GALLERY
router.get("/photos/photo-black-gallery", (req, res, next) => {
    // res.render("photos/photo-black-gallery")
    photoApi
        .getAllPhotos()
        .then(response => {
            const allPhotosGallery = response.data
            allPhotosGallery.splice(0, 10)
            allPhotosGallery.splice(12)

            res.render('photos/photo-black-gallery', { allPhotosGallery })
            // console.log(allPhotosGallery)
        })
        .catch(err => console.log(err))

})

//ruta get galeria fotos- COLOR GALERY
router.get("/photos/photo-color-gallery", (req, res, next) => {
    // res.render("photos/photo-black-gallery")
    photoApi
        .getAllPhotos()
        .then(response => {
            const allPhotosGallery = response.data
            allPhotosGallery.splice(0, 22)
            allPhotosGallery.splice(12)

            res.render('photos/photo-color-gallery', { allPhotosGallery })
            // console.log(allPhotosGallery)
        })
        .catch(err => console.log(err))

})

//ruta get- detalle BLACO Y NEGRO
router.get("/photos/black-details/:id", (req, res, next) => {
    // res.send("HOLAAAAAAA")
    const { id: photo_id } = req.params
    // console.log('------------------------------------------------------------------------------------', photo_id)

    photoApi
        .getOnePhoto(photo_id)
        // console.log(photo_id)

        .then(response => res.render("photos/black-details", { photo: response.data }))
        .catch(err => console.log(err))
})

//ruta get - detalle COLOR
router.get("/photos/color-details/:id", (req, res, next) => {
    const { id: photo_id } = req.params


    photoApi
        .getOnePhoto(photo_id)
        .then(response => res.render('photos/color-details', { photo: response.data }))
        .catch(err => console.log(err))
})














//ruta get -detalle COLOR

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