import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FileForm from '../shared/FileForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditFileModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updateFile, msgAlert, triggerRefresh } = props
    
    const [file, setFile] = useState(props.file)

    const onChange = (e) => {
        e.persist()
        console.log(file)
        setFile(prevFile => {
            const updatedName = e.target.name
            let updatedValue = e.target.value 

            const updatedFile = {
                [updatedName] : updatedValue
            }

            return {
                ...prevFile, ...updatedFile
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // updateFile(user, file)
        updateFile(user, file)
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
                    <FileForm
                        file={file}
                        handleChange={onChange}
                        handleSubmit={onSubmit}
                    />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditFileModal