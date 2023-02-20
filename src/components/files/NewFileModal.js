import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import UploadFileForm from './UploadFileForm'
import { createFile } from '../../api/files'
import messages from '../shared/AutoDismissAlert/messages'

//////////// <----This component takes props from Home.js  
//////////// and sends props to UploadFileForm---->

const NewFileModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh } = props
    // Set selectedFile to empty object
    const [selectedFile, setSelectedFile] = useState({})

    const onChange = (e) => {
        // Set selected file to the file in the target array
        e.preventDefault()
        setSelectedFile(e.target.files[0])
        // console.log('file in onChange from newFileModal', selectedFile)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // console.log('selectedFile name in onSubmit', selectedFile)
        // ! JORDAN ADD PSUEDO CODE FOR THESE TWO ROWS
        const formData = new FormData()
        formData.append('file', selectedFile)

        // API call function to create a file document
        createFile(user, formData)
            // close modal
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message:  messages.fileCreateSuccess,
                    variant: 'success'
                })
            })
            // if everything goes according to plan, we need a refresh home
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.fileCreateFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeVariant='white' id='new-file-header'>
                    <Modal.Title id='new-file-title'>Hoist New File</Modal.Title>
                </Modal.Header>
                <Modal.Body id='new-file-body'>
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