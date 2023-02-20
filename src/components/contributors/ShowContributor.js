import { useState } from 'react'
import { Card, Button, Image } from 'react-bootstrap'
import { deleteContributor } from '../../api/contributors'
import messages from '../shared/AutoDismissAlert/messages'
import EditContributorModal from './EditContributorModal'

//////////// <----This component takes props from ShowFileModal 
//////////// and sends props to ShowContributor---->

const ShowContributor = (props) => {
    const { contributor, user, file, msgAlert, triggerRefresh } = props
    // state to show modal
    const [editModalShow, setEditModalShow] = useState(false)

    // Style the contributor cards according to permission level
    const setBgCondition = (cond) => {
        if (cond === 'read and write') {
            return({ border: '1px solid #60c689', backgroundColor: '#000000'})
        } else if (cond === 'read only') {
            return({ border: '1px solid #c21858', backgroundColor: '#000000'})
        }
    }

    const destroyContributor = () => {
        // OnClick of delete contributor button, run API call to remove 
        deleteContributor(user, file, contributor)
        // upon success, we want to send a message
            .then(() => [
                msgAlert({
                    heading: 'Contributor Deleted', 
                    message: messages.contributerDeleteSuccess,
                    variant: 'success'
                })
            ])
            .then(() => triggerRefresh())
            .catch(() => [
                msgAlert({
                    heading: 'Oh No!', 
                    message: messages.contributerDeleteFailure,
                    variant: 'danger'
                })
            ])
    }

    return (
        <>
            <Card id='show-contributor-card' className='m-2' style={setBgCondition(contributor.permissionLevel)}>
                <Card.Body id='show-contributor-body'>
                    <p id='contributor-email'>{contributor.userRef.email}</p>
                    {
                        user && user._id === file.owner?._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant='warning'
                                className='m-2'
                                id='show-contributor-edit'
                            >
                                <Image style={{width: '90%'}} src='/icons/baseline_edit_white_24dp.png'/>
                            </Button>
                            <Button
                                onClick={() => destroyContributor()}
                                variant='danger'
                                className='m-2'
                                id='show-contributor-delete'
                            ><Image style={{width: '90%'}} src='/icons/baseline_delete_forever_white_24dp.png'/></Button>
                        </>
                        :
                        null
                    }
                </Card.Body>
            </Card>
            <EditContributorModal 
                user={user}
                file={file}
                contributor={contributor}
                filterValue={contributor.userRef.email}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowContributor