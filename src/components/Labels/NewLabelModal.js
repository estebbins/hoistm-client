import { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import LabelForm from '../shared/LabelForm'
import { createLabel } from '../../api/labels'
import messages from '../shared/AutoDismissAlert/messages'

//////////// <----This component takes props from LabelsSidebar.js  
//////////// and sends props to LabelForm---->

const NewLabelModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh } = props

    const [label, setLabel] = useState(null)

    useEffect(() => {
        // When show is updated, label is reset
        setLabel({})
    }, [show])

    const onChange = (e) => {
        // On change on label form, set the label to the new information
        e.persist()
        
        setLabel(prevLabel => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedLabel = {
                [updatedName] : updatedValue
            }
            // console.log('the label', updatedLabel)
            // console.log('the label (state)', label)
            return {
                ...prevLabel, ...updatedLabel
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createLabel(user, label)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.createLabelSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by the developers petard!',
                    message: messages.createLabelFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton closeVariant='white' id='new-label-header'>
                <Modal.Title>New Label</Modal.Title>
            </Modal.Header>
            <Modal.Body id='new-label-body'>
                <LabelForm
                    user={user}
                    label={label}
                    handleSubmit={onSubmit}
                    handleChange={onChange}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewLabelModal