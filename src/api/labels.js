import apiUrl from '../apiConfig'
import axios from 'axios'

export const deleteLabel = (user, label) => {
    return axios({
        url: `${apiUrl}/labels/${label._id}`, 
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    });
}

export const updateLabel = (user, newLabel) => {
    return axios({
        url: `${apiUrl}/labels/${newLabel._id}`, 
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { 
            label: newLabel
        }
    });
}
export const showLabel = (user, labelId) => {
    return axios({
        url: `${apiUrl}/labels/${labelId}`, 
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    
    });
}
export const createLabel = (user, newLabel) => {
    return axios({
        url: `${apiUrl}/labels`, 
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { 
            label: newLabel
        },
    });

}
export const getAllLabels = (user) => {
    return axios({
    url: `${apiUrl}/labels`, 
    method: 'GET',
    headers: {
        Authorization: `Token token=${user.token}`
    },

})}

export const addFileToLabel = (user, file, label) => {
    // console.log('axios label', label)
    // console.log('axios file', file)
    return axios({
        url: `${apiUrl}/labels/${label._id}/${file._id}`, 
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const getLabelsOnFile = (user, fileId) => {
    // console.log('getlabelsonfile', fileId)
    return axios({
        url: `${apiUrl}/filelabels/${fileId}`, 
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

export const removeFileFromLabel = (user, file, labelId) => {
    // console.log('axios label', labelId)
    // console.log('axios file', file)
    return axios({
        url: `${apiUrl}/removeLabel/${labelId}/${file._id}`, 
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}