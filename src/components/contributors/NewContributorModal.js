import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ContributorForm from '../shared/ContributorForm'
import { createContributor } from '../../api/contributors'
import messages from '../shared/AutoDismissAlert/messages'

const NewContributorModal = (props) => {
    const { user, file, show, handleClose, msgAlert, triggerRefresh } = props

    const [contributor, setContributor] = useState({})
    const [filterValue, setFilterValue] = useState('')

    const onChoice = (e) => {
        e.persist()
        
        setContributor(prevContributor => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedContributor = {
                [updatedName] : updatedValue
            }
            
            console.log('the contributor', updatedContributor)
            console.log('the contributor (state)', contributor)

            return {
                ...prevContributor, ...updatedContributor
            }
        })
    }

    const onChange = (e) => {
        e.preventDefault()
        // const filter = e.target.value
        // console.log(e.target.value)
        // console.log('filterValue', filterValue)
        setFilterValue(e.target.value)
        // console.log('filterValue', filterValue)

    }


    const onSubmit = (e) => {
        e.preventDefault()
        createContributor(user, file, contributor)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Hoist with someone elses petard!',
                    message: messages.createContributorSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by our petard!',
                    message: messages.createContributorFailure,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ContributorForm
                    user={user}
                    filterValue={filterValue}
                    contributor={contributor}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    handleChoice={onChoice}
                    heading={'Add Contributor'}
                    triggerRefresh={()=> triggerRefresh()}
                    msgAlert={msgAlert}
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewContributorModal
