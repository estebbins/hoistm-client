import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import messages from '../shared/AutoDismissAlert/messages'
import { getOneFile } from '../../api/files'

const ShowFileModal = (props) => {
    const { user, show, handleClose, msgAlert } = props
    
    const [file, setFile] = useState(props.file)

    useEffect(() => {
        getOneFile(user, file._id)
            .then(res => setFile(res.data.file))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting File',
                    message: 'something went wrong',
                    variant: 'danger'
                })
            })
    })

    if (!file) {
        return <p>Loading...</p>
    }

    const convertTimestamps = (timestamp) => {
        const formatted = new Date(timestamp)
        const date = formatted.getDate()
        const month = formatted.getMonth()
        const year = formatted.getFullYear()
        const hours = formatted.getHours()
        let minutes = formatted.getMinutes()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return `${date}/${month}/${year} ${hours}:${minutes}`
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{file.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={file.url} thumbnail className='border-0'/>
                <p>Hoisted On: {convertTimestamps(file.createdAt)}</p>
                <p>Last Modified: {convertTimestamps(file.updatedAt)}</p>
                <p>Hoisted By: {file.owner.email}</p>
            </Modal.Body>
        </Modal>
    )
}

export default ShowFileModal

// file name (possible Modal.Title), description, uploaded on, last modified, owner

// labels, list all labels associated

// edit and delete components nested in Modal.Footer

