import { useState } from 'react'
import { Modal } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
import LabelForm from '../shared/LabelForm'
import { createLabel } from '../../api/labels'
// import messages from '../shared/AutoDismissAlert/messages'

// In ShowFile:
// {/* <NewLabelModal
//     user={user}
//     show={labelModalShow}
//     handleClose={() => setLabelShow(false)}
//     msgAlert={msgAlert}
//     triggerRefresh={() => setUpdated(prev => !prev)}
// /> */}

const NewLabelModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh } = props

    const [label, setLabel] = useState({})

    // const navigate = useNavigate()

    const onChange = (e) => {
        e.persist()
        
        setLabel(prevLabel => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedLabel = {
                [updatedName] : updatedValue
            }
            
            console.log('the label', updatedLabel)
            console.log('the label (state)', label)

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
                    heading: 'Hoist with someone elses petard!',
                    // !message: messages.createLabelSuccess
                    message: 'Label successfully added!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // .then(() => {navigate('/')})
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by our petard!',
                    // !message: messages.createLabelFailure
                    message: 'Label not added',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <LabelForm
                    user={user}
                    label={label}
                    handleSubmit={onSubmit}
                    handleChange={onChange}
                    heading={'Add Label'}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewLabelModal
