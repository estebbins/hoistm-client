import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ContributorForm from '../shared/ContributorForm'
import { updateContributor } from '../../api/contributors'
import messages from '../shared/AutoDismissAlert/messages'

const EditContributorModal = (props) => {
    const { user, file, show, handleClose, msgAlert, triggerRefresh } = props

    // const [contributor, setContributor] = useState(props.contributor)

    const [contributor, setContributor] = useState(props.contributor)
    const [filterValue, setFilterValue] = useState(props.filterValue)
    // console.log(contributor.userRef.email)
    // console.log('props.filter', props.filterValue)
    // console.log('editcontmodal contributor', contributor)
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
        setFilterValue(e.target.value)
        // console.log('edit cont modal on change filter value', e.target.value)
        // console.log('edit cont modal filtervalue', filterValue)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        updateContributor(user, file, contributor)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Hoist with someone elses petard!',
                    message: messages.contributorSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by our petard!',
                    message: messages.updateContributorFailure,
                    variant: 'danger'
                })
            })
    }

    return (
    <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton closeVariant='white' id='contributor-edit-header'>
                <Modal.Title>Edit Contributor</Modal.Title>
        </Modal.Header>
        <Modal.Body id='contributor-edit-body'>
            <ContributorForm
                user={user}
                filterValue={filterValue}
                contributor={contributor}
                handleChange={onChange}
                handleSubmit={onSubmit}
                handleChoice={onChoice}
                heading={'Edit Contributor'}
                triggerRefresh={triggerRefresh}
                msgAlert={msgAlert}
            />
        </Modal.Body>
    </Modal>
    )
}

export default EditContributorModal
