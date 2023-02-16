import apiUrl from '../apiConfig'
import axios from 'axios'

export const deleteLabel = (user,label) => {
    return axios({
        url: `${apiUrl}/labels/${label._id}`, 
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    });

}
export const editLabel = (user,newLabel) => {
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
export const showLabel = (user,newLabel) => {
    return axios({
        url: `${apiUrl}/labels/${newLabel._id}`, 
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`
        },
    
    });
}
export const createLabel = (user,newLabel) => {
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
    return axios({url: `${apiUrl}/labels`, 
    method: 'GET',
    headers: {
        Authorization: `Token token=${user.token}`
    },

})}