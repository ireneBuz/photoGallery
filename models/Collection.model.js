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

        description: {
            type: String
        },

        image: {
            type: String,
        },
        images: [{
            title: String,
            url: String,
            // location: {
            //     type: {
            //         type: String
            //     },
            //     coordinates: {
            //         type: [Number]
            //     }
            // }
        }]
    })

const Collection = model("Collection", collectionSchema);
module.exports = Collection;