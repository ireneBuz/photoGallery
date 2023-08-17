module.exports = app => {
    const indexRoutes = require("./index.routes");
    app.use("/", indexRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/", authRoutes);

    const photoRoutes = require("./photo.routes");
    app.use("/photos", photoRoutes);

    const userRoutes = require("./user.routes");
    app.use("/user", userRoutes)

    const collectionRoutes = require("./collection.routes");
    app.use("/", collectionRoutes);
}