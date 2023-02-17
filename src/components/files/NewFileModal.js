import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import UploadFileForm from './UploadFileForm'
import { createFile } from '../../api/files'

const NewFileModal = (props) => {
    // destructure our props
    const { user, show, handleClose, msgAlert, triggerRefresh } = props
    
    const [selectedFile, setSelectedFile] = useState({})

    const onChange = (e) => {
        e.preventDefault()
        console.log(e)
        setSelectedFile(e.target.files[0])
        console.log('file in onChange from newFileModal', selectedFile)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log('selectedFile name in onSubmit', selectedFile)

        createFile(user, selectedFile)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'successfully updated file',
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh of the show page
            // we'll build a function in the ShowPet component that does this for us, and we'll import that here as a prop
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'failed to update file',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <UploadFileForm
                        handleChange={onChange}
                        handleSubmit={onSubmit}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NewFileModal