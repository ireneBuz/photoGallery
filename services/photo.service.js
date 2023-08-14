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

    getOneCharacter(photo_id) {
        return this.axiosApp.get(`/id/{image}`)
    }

    //     saveCharacter(character_data) {
    //         return this.axiosApp.post(`/characters`, character_data)
    //     }

    //     editCharacter(character_id, character_data) {
    //         return this.axiosApp.put(`/characters/${character_id}`, character_data)
    //     }
}


const photoApi = new PhotosApiHandler()
module.exports = photoApi