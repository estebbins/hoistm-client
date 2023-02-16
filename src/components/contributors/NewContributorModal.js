import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ContributorForm from '../shared/ContributorForm'
import { createContributor } from '../../api/contributors'
// import messages from '../shared/AutoDismissAlert/messages'

// In ShowFile:
// {/* <NewContributorModal
//     user={user}
//     file={file}
//     show={contributorModalShow}
//     handleClose={() => setContributorShow(false)}
//     msgAlert={msgAlert}
//     triggerRefresh={() => setUpdated(prev => !prev)}
// /> */}

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
        console.log(e.target.value)
        console.log('filterValue', filterValue)
        setFilterValue(e.target.value)
        console.log('filterValue', filterValue)
        // const removedFruitList = props.fruits.filter(fruit => {return !fruit.toLowerCase().includes(filterValue.toLowerCase())})
        // setFruitsToDisplay(filteredFruitList)
        // setRemovedFruits(removedFruitList)
        // console.log('filter', filter)

        // getFilteredUsers(user, filterValue)
        //     .then(res => {setUserList(res.data.users)})
        //     .then(() => triggerRefresh())
        //     .catch(err => {
        //         msgAlert({
        //             heading: 'Error getting users',
        //             // !message: messages.getUserFailure
        //             message: 'Unable to get users',
        //             variant: 'danger'
        //         })
        //         setError(true)
        // })
        
    //     if (error) {
    //         return <p>Error!</p>
    //     }
        
    //     if (!users) {
    //         // if no users loaded yet, display 'loading'
    //         // return <LoadingScreen />
    //         return 
    //     } else if (users.length === 0) {
    //         // otherwise if there ARE no pets, display that message
    //         return <p>No pets yet, go add some!</p>
    //     }
    // }
    // useEffect MAY not work here because it's when component mounts
    // useEffect(() => {
    //     getFilteredUsers(filterValue)
    //         .then(res => setUserList(res.data.users))
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error getting users',
    //                 // !message: messages.getUserFailure
    //                 message: 'Unable to get users',
    //                 variant: 'danger'
    //             })
    //             setError(true)
    //         })
    // }, [])
    }
    // useEffect(() => {
    //     getFilteredUsers(user, filterValue)
    //     .then(res => {setUserList(res.data.users)})
    //     .then(() => triggerRefresh())
    //     .catch(err => {
    //         msgAlert({
    //             heading: 'Error getting users',
    //             // !message: messages.getUserFailure
    //             message: 'Unable to get users',
    //             variant: 'danger'
    //         })
    //         setError(true)
    //     })
    // }, [filterValue])

    const onSubmit = (e) => {
        e.preventDefault()
        createContributor(user, file, contributor)
            // close the modal
            .then(() => handleClose())
            // send a success message
            .then(() => {
                msgAlert({
                    heading: 'Hoist with someone elses petard!',
                    // !message: messages.createContributorSuccess
                    message: 'Contributor successfully added!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by our petard!',
                    // !message: messages.createContributorFailure
                    message: 'Contributor not added',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <ContributorForm
                    // userList={userList}
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
