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

//ruta get listado general fotos-BLACK AND WHITE GALLERY
router.get("/photos/photo-black-gallery", (req, res, next) => {
    // res.render("photos/photo-black-gallery")
    photoApi
        .getAllPhotos()
        .then(response => {
            const allPhotosGallery = response.data
            allPhotosGallery.splice(0, 10)
            allPhotosGallery.splice(10)

            res.render('photos/photo-black-gallery', { allPhotosGallery })
            // console.log(allPhotosGallery)
        })
        .catch(err => console.log(err))

})

//ruta get listado general de fotos- COLOR GALERY
router.get("/photos/photo-color-gallery", (req, res, next) => {
    // res.render("photos/photo-black-gallery")
    photoApi
        .getAllPhotos()
        .then(response => {
            const allPhotosGallery = response.data
            allPhotosGallery.splice(0, 20)
            allPhotosGallery.splice(10)

            res.render('photos/photo-color-gallery', { allPhotosGallery })
            // console.log(allPhotosGallery)
        })
        .catch(err => console.log(err))

})

// //ruta get detalles fotos blanco y negro
// router.get("/photos/black-gallery-details", (req, res, next) => {
//     // res.render("photos/black - gallery - details")
//     const { id: photo_id } = req.params

//     photoApi
//         .getOnePhotoById(photo_id)
//         .then(response => res.render("/photos/black-gallery-details", { photo: response.data }))
//         .catch(err => console.log(err))
// })


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