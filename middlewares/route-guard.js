const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect("user-index")
    }
}


const isLoggedOut = (req, res, next) => {

    console.log('ESTAS EN MIDDLEWARE IS LOGGED OUT')
    if (!req.session.currentUser) {
        next()
    } else {
        res.redirect("/")
    }
}

module.exports = {
    isLoggedIn,
    isLoggedOut
}