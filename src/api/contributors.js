import apiUrl from '../apiConfig'
import axios from 'axios'

export const createContributor = (user, file, newContributor) => {
    console.log(newContributor)
    return axios({
        url: `${apiUrl}/contributors/${file._id}`, 
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { contributor: newContributor }
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