
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");
const express = require("express");


const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);


//TITULO
const capitalize = require("./utils/capitalize");
const projectName = "Photo-gallery";

app.locals.appTitle = `${capitalize(projectName)}`;


// MIS RUTAS
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const photoRoutes = require("./routes/photo.routes");
app.use("/", photoRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes)

const collectionRoutes = require("./routes/collection.routes");
app.use("/", collectionRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
