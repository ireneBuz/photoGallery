//ruta perfil usuario
const express = require('express');
const { isLoggedIn } = require('../middlewares/route-guard');
const router = express.Router();
const User = require('../models/User.model'); //nuevo

//User Profile

router.get("/user/user-profile", isLoggedIn, (req, res) => {

    const userId = req.session.currentUser

    User
        .findById(userId)
        .then(user => res.render("user/user-profile", user))
        .catch(err => console.log(err))
})

router.post("/user/user-profile", isLoggedIn, (req, res) => {
    res.render("user/user-profile")
})


module.exports = router