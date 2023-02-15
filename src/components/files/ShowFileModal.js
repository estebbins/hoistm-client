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

    const dateFormat = new Date(file.createdAt)
    const date = dateFormat.getDate()
    const month = dateFormat.getMonth()
    const year = dateFormat.getFullYear()
    const hours = dateFormat.getHours()
    let minutes = dateFormat.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <p>File Name: {file.name}</p>
                <p>Hoisted On: {`${date}/${month}/${year} ${hours}:${minutes}`}</p>
            </Modal.Body>
        </Modal>
    )
}

export default ShowFileModal

// file name (possible Modal.Title), description, uploaded on, last modified, owner

// labels, list all labels associated

// edit and delete components nested in Modal.Footer

