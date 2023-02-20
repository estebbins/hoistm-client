import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ContributorForm from '../shared/ContributorForm'
import { updateContributor } from '../../api/contributors'
import messages from '../shared/AutoDismissAlert/messages'

//////////// <----This component takes props from ShowContributor 
//////////// and sends props to ContributorForm---->

const EditContributorModal = (props) => {
    const { user, file, show, handleClose, msgAlert, triggerRefresh } = props

    // Set contributor & filter value from props
    const [contributor, setContributor] = useState(props.contributor)
    const [filterValue, setFilterValue] = useState(props.filterValue)
    // console.log(contributor.userRef.email)
    // console.log('props.filter', props.filterValue)
    // console.log('editcontmodal contributor', contributor)

    const onChoice = (e) => {
        // On choice of permission level, update the value of contributor
        e.persist()
        
        setContributor(prevContributor => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            const updatedContributor = {
                [updatedName] : updatedValue
            }
            
            // console.log('the contributor', updatedContributor)
            // console.log('the contributor (state)', contributor)

            return {
                ...prevContributor, ...updatedContributor
            }
        })
    }

    const onChange = (e) => {
        // On form change, set the filterValue to the user's input
        setFilterValue(e.target.value)
        // console.log('edit cont modal on change filter value', e.target.value)
        // console.log('edit cont modal filtervalue', filterValue)
    }

    const onSubmit = (e) => {
        // On form submit, send the API call to change the contributor
        e.preventDefault()
        updateContributor(user, file, contributor)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Hoist with someone elses petard!',
                    message: messages.contributorSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Error',
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
                    triggerRefresh={triggerRefresh}
                    msgAlert={msgAlert}
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditContributorModal
