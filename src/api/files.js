import apiUrl from '../apiConfig'
import axios from 'axios'
import { AccordionCollapse } from 'react-bootstrap'

// may need to add auth to this, treat it like a /mine route, send userId possibly
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
    console.log('getonefile', id)
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
    console.log('file in axios:', file)
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

function blobToDataUrl(blob, callback) {
    let a = new FileReader()
    a.onload = function (e) {
        callback(e.target.result)
    }
    a.readAsDataURL(blob)
}

export const downloadFile = (file) => {
    return axios.get(`${apiUrl}/files/${file.awsKey}`, {
        responseType: 'blob'
    })
        .then((response) => {
            blobToDataUrl(response.data, function(dataurl) {
                setImgFromStorage(dataurl)
            })
        })
        .catch(err => console.log(err))
}