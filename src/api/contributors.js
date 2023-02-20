import apiUrl from '../apiConfig'
import axios from 'axios'

export const updateContributor = (user, file, updatedContributor) => {
    // console.log('updatedContributor', updatedContributor)
    return axios({
        url: `${apiUrl}/contributors/${file._id}/${updatedContributor._id}`, 
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { contributor: updatedContributor }
    })
}

export const getFilteredUsers = (user, filter) => {
    return axios({
        url: `${apiUrl}/contributors/${filter}`, 
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    })
}

export const createContributor = (user, file, newContributor) => {
    // console.log(newContributor)
    return axios({
        url: `${apiUrl}/contributors/${file._id}`, 
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { contributor: newContributor }
    })
}

export const deleteContributor = (user, file, contributor) => {
    return axios({
        url: `${apiUrl}/contributors/${file._id}/${contributor._id}`, 
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}