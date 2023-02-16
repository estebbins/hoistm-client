import apiUrl from '../apiConfig'
import axios from 'axios'

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