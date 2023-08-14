//ruta perfil usuario
const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();

router.get("/user/user-profile", isLoggedIn, (req, res) => {
    // res.send("hola")
    res.render("user/user-profile")

})


router.post("/user/user-profile", isLoggedIn, (req, res) => {
    res.render("user/user-profile")
})


module.exports = router