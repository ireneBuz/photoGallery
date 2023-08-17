const { Schema, model } = require('mongoose')
const collectionSchema = new Schema(
    {
        title: {
            type: String
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
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
        }]
    })

const Collection = model("Collection", collectionSchema);
module.exports = Collection;