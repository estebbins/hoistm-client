import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllFiles = (user) => {
    return axios({
        url: `${apiUrl}/files/`, 
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const getOneFile = (user, id) => {
    // console.log('getonefile', id)
    return axios({
        url: `${apiUrl}/files/${id}`, 
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const updateFile = (user, updatedFile) => {
    return axios({
        url: `${apiUrl}/files/${updatedFile._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { file: updatedFile }
    })
}

export const createFile = (user, file) => {
    // console.log('file in axios:', file)
    return axios({
        url: `${apiUrl}/files`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: file,
    })
}

export const deleteFile = (user, file) => {
    return axios({
        url: `${apiUrl}/files/${file._id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}



export const downloadFile = (user, file) => {
    return axios.get(`${apiUrl}/files/download/${file._id}`, {
        responseType: 'blob',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}