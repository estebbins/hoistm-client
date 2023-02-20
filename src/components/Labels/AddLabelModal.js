import { useEffect, useState } from 'react'
import { addFileToLabel } from '../../api/labels'
import { Button, Image, Modal } from 'react-bootstrap'


const AddLabelModal = (props) => {
    const { file, labels, user, show, handleClose, msgAlert, triggerRefresh } = props

    const [label, setLabel] = useState(null)

    // useEffect(() => {
    //     console.log(label)
    // }, [label])

    useEffect(() => {
        if (label) {
            addFileToLabel(user, file, label)
                .then(() => handleClose())
                .then(() => {
                    msgAlert({
                        heading: 'Hoist more specifically!',
                        // !message: messages.addFileToLabelSuccess
                        message: 'Label successfully added!',
                        variant: 'success'
                    })
                })
                .then(() => triggerRefresh())
                // if there is an error, tell the user about it
                .catch(() => {
                    msgAlert({
                        heading: 'Oh No! Hoisted by our petard!',
                        // !message: messages.addFileToLabelFailure
                        message: 'Label not added',
                        variant: 'danger'
                    })
                })
        }
    }, [label])

    const onClick = (e) => {
        e.preventDefault()
        setLabel(JSON.parse(e.target.value))
        // console.log('label in onclick', label)
        // let addLabel = JSON.parse(e.target.value)
        // addFileToLabel(user, file, addLabel)
        //     .then(() => handleClose())
        //     .then(() => {
        //         msgAlert({
        //             heading: 'Hoist more specifically!',
        //             // !message: messages.addFileToLabelSuccess
        //             message: 'Label successfully added!',
        //             variant: 'success'
        //         })
        //     })
        //     .then(() => triggerRefresh())
        //     // if there is an error, tell the user about it
        //     .catch(() => {
        //         msgAlert({
        //             heading: 'Oh No! Hoisted by our petard!',
        //             // !message: messages.addFileToLabelFailure
        //             message: 'Label not added',
        //             variant: 'danger'
        //         })
        //     })
    }

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