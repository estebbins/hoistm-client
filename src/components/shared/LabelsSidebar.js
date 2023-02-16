import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import {getOneFile} from '../..api/files'
const NewLabelModal = (props) => {
    const { show, handleClose, msgAlert, triggerRefresh } = props

    const [toy, setToy] = useState({})

    const onChange = (e) => {
        e.persist()
        
        setToy(prevToy => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'isSqueaky' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'isSqueaky' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedToy = {
                [updatedName] : updatedValue
            }
            
            console.log('the toy', updatedToy)
            console.log('the toy (state)', toy)

            return {
                ...prevToy, ...updatedToy
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        createLabel(pet.id, toy)
            // first we'll close the modal
            .then(() => handleClose())
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createToySuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createToyFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ToyForm 
                    toy={toy}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading={`Give ${pet.name} a toy!`}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewLabelsModal