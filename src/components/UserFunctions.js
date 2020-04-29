import axios from 'axios'

export const register = newPostulant => {
    return axios
        .post('api/postulant', newPostulant, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const getPostulant = () => {
    return axios
        .get('api/postulant', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAnnouncement = () => {
    return axios
        .get('api/announcement', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getPostulantsEnabled = () =>{
    return axios
       .get('api/postulantEnable', {
           headers: {'Content-Type': 'application/json'}
       })
       .then(response => {
        return response.data
       })
       .catch(err => {
           console.log(err)
       })
}

export const getAnnouncementID = (id) => {
    return axios
        .get('api/announcement/'+id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const registerAnnouncement = newAnnouncement => {
    return axios
        .post('api/announcement', newAnnouncement, {
            headers: { 'Content-Type' : 'multipart/form-data' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}


export const login = user => {
    return axios
        .post(
            'api/login',
            {
                email: user.email,
                password: user.password
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            localStorage.setItem('usertoken', response.data.token)
            return response.data.token
        })
        .catch(err => {
            console.log(err)
        })
}

export const getProfile = () => {
    return axios
        .get('api/profile', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

