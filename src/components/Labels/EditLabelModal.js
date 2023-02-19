import { useEffect, useState } from 'react'
import { Modal, Button, Container } from 'react-bootstrap'
import LabelForm from '../shared/LabelForm'
import { updateLabel, deleteLabel } from '../../api/labels'
import messages from '../shared/AutoDismissAlert/messages'

const EditLabelModal = (props) => {
    const { user, editLabel, show, handleClose, msgAlert, triggerRefresh } = props

    // console.log('props.label', props.label)
    const [label, setLabel] = useState({})
    // console.log('basically props.label', editLabel)

  
    // console.log('editcontmodal label', label)
    useEffect(() => {
        setLabel(editLabel)
        // console.log('use effect edit label', editLabel)
    }, [editLabel])

    const onChange = (e) => {
        e.persist()
        
        setLabel(prevLabel => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedLabel = {
                [updatedName] : updatedValue
            }
            
            console.log('!!!!!!!!!!!!!the label', updatedLabel)
            console.log('!!!!!!!!!!!!!!the label (state)', label)

            return {
                ...prevLabel, ...updatedLabel
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateLabel(user, label)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: "Hoist with someone else's petard!",
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

    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton closeVariant='white' id='edit-label-header'>
            <Modal.Title>Edit Label</Modal.Title>
        </Modal.Header>
        <Modal.Body id='edit-label-body'>
            <LabelForm
                label={label}
                handleChange={onChange}
                handleSubmit={onSubmit}
                heading={'Edit Label'}
            />
            <Container className='d-flex flex-row justify-content-end'>
                <Button id='delete-file-button' className='m-2 text-white' variant='warning' onClick={() => removeLabel()}>Delete</Button>
            </Container>
        </Modal.Body>
    </Modal>
    )
}

export default EditLabelModal
