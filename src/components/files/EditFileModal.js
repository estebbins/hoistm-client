import React, { useState, useEffect } from 'react'
import { Modal, Button, Image } from 'react-bootstrap'
import { updateFile} from '../../api/files'
import FileForm from '../shared/FileForm'
import messages from '../shared/AutoDismissAlert/messages'

//////////// <----This component takes props from ShowFileModal
//////////// and sends props to FileForm---->

const EditFileModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh, triggerFileRefresh, removeFile } = props
    // console.log('the file in edit file', props.file)
    // Set file state to empty object
    const [file, setFile] = useState({})

    useEffect(() => {
        // When the file from props changes, update it
        setFile(props.file)
    }, [props.file])

    const onChange = (e) => {
        e.persist()
        console.log('onchange edit file', file)
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
        // API Call to update the file
        updateFile(user, file)
            // first we'll handle closing the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: messages.fileUpdateSuccess,
                    variant: 'success'
                })
            })
            // Refresh multiple components
            .then(() => triggerFileRefresh())
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.fileUpdateFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeVariant='white' id='edit-file-header'>
                    <Button 
                        className='show-file-button me-3' 
                        variant='danger' 
                        id='delete-file-button' 
                        onClick={() => {
                            removeFile() 
                            handleClose()}
                        }
                    ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_delete_forever_white_24dp.png'/></Button>
                    <Modal.Title>Edit File Details</Modal.Title>
                </Modal.Header>
                <Modal.Body id='edit-file-body'>
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