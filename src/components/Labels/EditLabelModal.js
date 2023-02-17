import { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import LabelForm from '../shared/LabelForm'
import { updateLabel } from '../../api/labels'
// import messages from '../shared/AutoDismissAlert/messages'

const EditLabelModal = (props) => {
    const { user, editLabel, show, handleClose, msgAlert, triggerRefresh } = props

    // console.log('props.label', props.label)
    const [label, setLabel] = useState({})
    console.log('basically props.label', editLabel)

    console.log('editcontmodal label', label)
    useEffect(() => {
        setLabel(editLabel)
        console.log('use effect edit label', editLabel)
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
                    heading: 'Hoist with someone elses petard!',
                    // !message: messages.updateLabelSuccess
                    message: 'Label successfully edited!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by our petard!',
                    // !message: messages.updateLabelFailure
                    message: 'Label not edited',
                    variant: 'danger'
                })
            })
    }


    return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
            <LabelForm
                label={label}
                handleChange={onChange}
                handleSubmit={onSubmit}
                heading={'Edit Label'}
            />
        </Modal.Body>
    </Modal>
    )
}

export default EditLabelModal
