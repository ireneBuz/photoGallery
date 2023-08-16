const { Schema, model } = require('mongoose')
const collectionSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'// Nombre del modelo referenciado
        },

        camera: {
            type: String,
        },

        description: {
            type: String
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