import { useEffect, useState } from 'react'
import { Modal, Button, Image, Container } from 'react-bootstrap'
import LabelForm from '../shared/LabelForm'
import { updateLabel, deleteLabel } from '../../api/labels'
import messages from '../shared/AutoDismissAlert/messages'

//////////// <----This component takes props from LabelsIndex  
//////////// and sends props to LabelForm---->
/////////// Delete Label is an option on this modal

const EditLabelModal = (props) => {
    const { user, editLabel, show, handleClose, msgAlert, triggerRefresh } = props

    // State for label that is being edited
    const [label, setLabel] = useState({})
  
    useEffect(() => {
        // When the label selected from labelsindex is changed, set the label to be edited to that label
        setLabel(editLabel)
    }, [editLabel])

    const onChange = (e) => {
        // On change in form updates the information
        e.persist()
        
        setLabel(prevLabel => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedLabel = {
                [updatedName] : updatedValue
            }
            // console.log('!!!!!!!!!!!!!the label', updatedLabel)
            // console.log('!!!!!!!!!!!!!!the label (state)', label)
            return {
                ...prevLabel, ...updatedLabel
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        // API Call to patch the label with the new information
        updateLabel(user, label)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.updateLabelSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: "Oh No! Hoisted by the developers' petard!",
                    message: messages.updateLabelFailure,
                    variant: 'danger'
                })
            })
    }

    const removeLabel = () => {
        // Click delete button, triggers API call to delete that label
        deleteLabel(user, label)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Begone! Label delete success!',
                    message: messages.labelDeleteSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Could not delete label',
                    message: messages.labelDeleteFailure,
                    variant: 'danger'
                })
            })
    }

    // Return the modal with the LabelForm

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton closeVariant='white' id='edit-label-header'>
                <Button     
                    className='show-file-button me-3' 
                    variant='danger' 
                    id='delete-file-button' 
                    onClick={() => removeLabel()}
                ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_delete_forever_white_24dp.png'/></Button>
                <Modal.Title>Edit Label</Modal.Title>
            </Modal.Header>
            <Modal.Body id='edit-label-body'>
                <LabelForm
                    label={label}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                />
                <Container className='d-flex flex-row justify-content-end'>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default EditLabelModal
