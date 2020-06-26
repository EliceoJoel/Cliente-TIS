import axios from 'axios'

export const login = user => {
    return axios
        .post(
            'api/login',
            {
                user: user.user,
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
            //console.log(err)
        })
}

export const register = newUser => {
    return axios
        .post('api/register', newUser, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
            return response.data
        })
        .catch(err => {
            //console.log(err)
        })
}

export const registerP = newPostulant => {
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


export const getUser = () => {
    return axios
        .get('api/user', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}


export const updateUser = user => {
    console.log(user.logged)
    return axios
        .post('api/user/'+user.id, user, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const getPermissions = (idRol) => {
    return axios
        .get('api/permission/rol/'+idRol, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const registerInBook = newRegister => {
    return axios
        .post('api/registerBook', newRegister, {
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
export const getAnnouncementIDGenerateRotulate = (id) => {
    return axios
        .get('api/announcementGenerate/'+id, {
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

export const getProfile = () => {
    return axios
        .get('api/profile', {
            headers: { Authorization: `Bearer ${localStorage.usertoken}` }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getScores = () => {
    return axios
        .get('api/scores', {
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

export const getStudents = () =>{
    return axios
       .get('api/students', {
           headers: {'Content-Type': 'application/json'}
       })
       .then(response => {
        return response.data
       })
       .catch(err => {
           console.log(err)
       })
}

export const updateScore = (score) =>{
    return axios
        .post(
            'api/update/' + score.id,
            {
                id_postulant: score.id,
                score: score.score,
                score_oral: score.score_oral
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

export const getRol = () =>{
    return axios
       .get('api/rol', {
           headers: {'Content-Type': 'application/json'}
       })
       .then(response => {
        return response.data
       })
       .catch(err => {
           console.log(err)
       })
}

export const saveAnnouncement = data => {
    return axios
   
            .post('api/userAnnouncement', data, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const registerRol = newRegister => {
    return axios
        .post('api/rol', newRegister, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const registerPermission = newRegister => {
    return axios
        .post('api/permission', newRegister, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const auxiliary = id => {
    return axios
        .post('api/auxiliary', id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            console.log(response)
        })
        .catch(err => {
            console.log(err)
        })
}

export const getStudentData = data => {
    return axios
        .post('api/studentsData', data, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const  percentageData = (data) =>{
    return axios
        .post(
            'api/percentageData',data,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}


export const getUserAnnouncementsDoc = (id) => {
    //console.log(id);
    return axios
        .get('api/userAnnouncement/'+id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

 export const getUserAnnouncements = (id) => {
     console.log(id);
     return axios
         .get('api/userAnnouncementUser/'+id, {
             headers: { 'Content-Type': 'application/json' }
         })
         .then(response => {
             return response.data
         })
         .catch(err => {
             console.log(err)
         })
 }

export const getQualifiedPostulants = (data) => {
    return axios
        .post('api/enablePostulant', data, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getConfigMeritos = (announcement) => {
    return axios
        .get('api/getMerit/'+announcement, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            //console.log(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const  registrarNotaMerito = (data) =>{
    return axios
        .post(
            'api/meritosRegister',data,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const  notaMerito = (data) =>{
    return axios
        .post(
            'api/notaMeritos',data,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getNotasMerito = () => {
    return axios
        .get('api/obtenerNotasMerito', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            //console.log(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAllUsers = () =>{
    //console.log(id);
    return axios
       
        
        .get('api/AllUsers', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAux = id => {
    return axios
        .get('api/getAux/' + id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getTheme = aux => {
    return axios
        .post('api/getTheme', aux, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const getFinalScores = (id) => {
    return axios
        .get('api/finalScores/' + id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAllNotes = () => {
    return axios
        .get('api/allNotes', {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            //console.log(response.data)
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUserAnnouncementsLab = (id) => {
    //console.log(id);
    return axios
        .get('api/userAnnouncementLab/'+id, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUserAuxiliary = (id,conv) => {
    //console.log(id);
    return axios
        .get('api/userAuxiliary/'+id + '/' + conv, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getUserTheme = (id,conv,aux) => {
    //console.log(id);
    return axios
        .get('api/userTheme/'+id + '/' + conv + '/' + aux ,{
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

export const getTheoryScore  = (id, postulant) => {
    //console.log(id);
    return axios
        .get('api/theoryScore/'+id +'/' + postulant ,{
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

export const getLabScore  = (id) => {
    //console.log(id);
    return axios
        .get('api/GetLabScore/'+id ,{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const finalTheoryScore  = (data) => {
    //console.log(id);
    return axios
        .post('api/notaConocimiento', data ,{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAverage  = (id) => {
    //console.log(id);
    return axios
        .get('api/getAverage/'+id ,{
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
}

export const getAnn  = () => {
    //console.log(id);
    return axios
        .get('/api/announcement', {
        headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e);
        })
}

export const getAuxThemes  = (id) => {
    //console.log(id);
    return axios
        .get('/api/getAuxTheme/' + id, {
        headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e);
        })
}

export const getPostEnableAux  = (id) => {
    //console.log(id);
    return axios
        .get('/api/AuxPostEn/' + id, {
        headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e);
        })
}

export const getLabScores  = (id) => {
    //console.log(id);
    return axios
        .get('/api/GetLabScore/' + id, {
        headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e);
        })
}

export const getScoreCount  = (id) => {
    //console.log(id);
    return axios
        .get('/api/sumTheme/' + id, {
        headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e);
        })
}

export const getRolName  = () => {
    //console.log(id);
    return axios
        .get('/api/rolname', {
        headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.data
        })
        .catch(e => {
            console.log(e);
        })
}
