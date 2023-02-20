import { useEffect, useState } from 'react'
import { addFileToLabel } from '../../api/labels'
import { Button, Modal } from 'react-bootstrap'
import messages from '../shared/AutoDismissAlert/messages'

//////////// <----This component takes props from ShowFileModal

const AddLabelModal = (props) => {
    const { file, labels, user, show, handleClose, msgAlert, triggerRefresh } = props
    // State for label to be added
    const [label, setLabel] = useState(null)

    useEffect(() => {
        // If theres a change in label state, refresh
        // If the label is not null/false, then run API call to add the file to the label
        if (label) {
            addFileToLabel(user, file, label)
                .then(() => handleClose())
                .then(() => {
                    msgAlert({
                        heading: 'Success!',
                        message: messages.addFileToLabelSuccess,
                        variant: 'success'
                    })
                })
                .then(() => triggerRefresh())
                // if there is an error, tell the user about it
                .catch(() => {
                    msgAlert({
                        heading: 'Oh No!',
                        message: messages.addFileToLabelFailure,
                        variant: 'danger'
                    })
                })
        }
    }, [label])

    const onClick = (e) => {
        // onClick of a label, set the label to parsed button value
        e.preventDefault()
        setLabel(JSON.parse(e.target.value))
    }

    // Create label buttons
    let labelsList
    if (labels && labels.length > 0) {
        labelsList = labels.map((label, i) => (
            <Button   
                    className='m-1 label-buttons mb-0'
                    key={i}
                    onClick={onClick}
                    value={JSON.stringify(label)}
                ><div id='label-tag' style={{backgroundColor:`${label.color}`}}></div>{label.name}</Button>
        ))
    }
    // Return the label modal
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton closeVariant='white' id='add-label-header'>
                    <Modal.Title>Add Label</Modal.Title>
                </Modal.Header>
                <Modal.Body id='add-label-body'>
                    { labelsList }
                </Modal.Body>
            </Modal>
        </>
    )

}

export default AddLabelModal