const axios = require('axios')

class PhotosApiHandler {
    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://picsum.photos'

        })
    }

    getAllPhotos() {
        return this.axiosApp.get('/v2/list')
    }

    getOnePhoto(photo_id) {
        return this.axiosApp.get(`/id/${photo_id}/info`)
    }
}


const photoApi = new PhotosApiHandler()
module.exports = photoApi