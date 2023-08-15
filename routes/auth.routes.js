const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { isLoggedOut } = require('../middlewares/route-guard');
const plainPassword = 'Hello';
const saltRounds = 10

//register route
router.get("/signup", isLoggedOut, (req, res) => {
    res.render("auth/signup")
})

router.post("/signup", isLoggedOut, (req, res, next) => {
    const { username, email, password } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({ username, email, password: hash }))
        .then(() => res.redirect("/login"))
        .catch(err => next(err))

    // res.render("auth/signup")
})

//login route

router.get("/login", isLoggedOut, (req, res) => {
    res.render("auth/login")
})

router.post("/login", isLoggedOut, (req, res) => {
    const { email, password } = req.body
    // res.send(req.body)

    if (email.length === 0 || password.length === 0) {
        res.render("/login", { errorMessage: 'Fill the fields' })
        return
    }

    User
        .findOne({ email })
        .then(foundUser => {

            if (!foundUser) {
                res.render("auth/login", { errorMessage: 'No user' })
                return
            }

            if (!bcrypt.compareSync(password, foundUser.password)) {
                res.render("auth/login", { errorMessage: 'Wrong password' })
                return
            }

            req.session.currentUser = foundUser // login!
            res.redirect("/")
        })
        .catch(err => next(err))
})

//log out route
router.get("/logout", (req, res) => {
    req.session.destroy(() => res.redirect("/"))
})

module.exports = router