const { Schema, model } = require('mongoose')
const collectionSchema = new Schema(
    {
        author: {
            type: String,
        },

        bio: {
            type: String,
        },

        camera: {
            type: String,
        },

        location: {
            type: String,
        },

        description: {
            type: String
        },

        image: {
            type: String,
        },
        images: [{
            title:
        }]
    })

const Collection = model("Collection", collectionSchema);
module.exports = Collection;