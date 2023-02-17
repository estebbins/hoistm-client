import React, { useEffect, useState } from 'react'
import { Modal, Button, Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import messages from '../shared/AutoDismissAlert/messages'
import { updateFile } from '../../api/files'
import { getLabelsOnFile } from '../../api/labels'
import NewContributorModal from '../contributors/NewContributorModal'
import EditFileModal from './EditFileModal'
// import ContributorsIndex from '../contributors/ContributorsIndex'
import ShowContributor from '../contributors/ShowContributor.js'

const ShowFileModal = (props) => {
    const { user, show, handleClose, msgAlert, triggerRefresh } = props
    // console.log('show props.file', props.file)
    const [file, setFile] = useState({})
    const [contributorModalShow, setContributorShow] = useState(false)
    const [editFileModalShow, setEditFileModalShow] = useState(false)
    const [labels, setLabels] = useState([])
    // console.log('show file file', file)
    // console.log('show file labels', labels)
    // console.log('email', file.owner)
    useEffect(() => {
        setFile(props.file)
    }, [props.file])
    useEffect(() => {
        // console.log('props.file._id', props.file._id)
        // getOneFile(user, props.file._id)
        //     .then(res => setFile(res.data.file))
        //     .then(()=>triggerRefresh())
        //     .catch(err => {
        //         msgAlert({
        //             heading: 'Error getting File',
        //             message: 'something went wrong',
        //             variant: 'danger'
        //         })
        //     })
        getLabelsOnFile(user, file)
            .then(res => setLabels(res.data.labels))
            .then(()=>triggerRefresh())
            .catch(err => {
                msgAlert({
                    heading: 'Error getting labels',
                    // ! message: messages.getLabelsOnFileFailure
                    message: 'Oops! Could not retrieve labels!',
                    variant: 'danger'
                })
            })
    }, [file])

    console.log('show file modal labels')

    // useEffect(() => {
    //     getLabelsOnFile(user, file)
    //         .then(res => setLabels(res.data.labels))
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error getting labels',
    //                 // ! message: messages.getLabelsOnFileFailure
    //                 message: 'Oops! Could not retrieve labels!',
    //                 variant: 'danger'
    //             })
    //         })
    // }, [])

    const convertTimestamps = (timestamp) => {
        const formatted = new Date(timestamp)
        const date = formatted.getDate()
        const month = formatted.getMonth()
        const year = formatted.getFullYear()
        const hours = formatted.getHours()
        let minutes = formatted.getMinutes()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return `${date}/${month}/${year} ${hours}:${minutes}`
    }

    let contributorList
    if (file && file.contributors) {
        if (file.contributors.length > 0) {
            contributorList = file.contributors.map(cont => (
                <ShowContributor 
                    key={cont._id}
                    contributor={cont}
                    user={user}
                    file={file}
                    msgAlert={msgAlert}
                    triggerRefresh={triggerRefresh}
                />
                )    
            )
        }
    }
    if (!file) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{file.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Image src={file.url} thumbnail className='border-0'/>
                    <p>Hoisted On: {convertTimestamps(file.createdAt)}</p>
                    <p>Last Modified: {convertTimestamps(file.updatedAt)}</p>
                    {/* <p>Hoisted By: {file.owner.email}</p> */}
                        {
                            file.owner && user && file.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setContributorShow(true)}
                                >
                                    Add Contributor
                                </Button>
                                <Button 
                                    className="m-2" variant="warning"
                                    onClick={() => setEditFileModalShow(true)}
                                >
                                    Edit File
                                </Button>
                            </>
                            :
                            null
                        }
                        { 
                            file.owner && user && file.owner._id === user._id && file.contributors 
                            ?
                            <Container>
                                { contributorList }
                            </Container>
                            :
                            null
                        }
                </Modal.Body>
            </Modal>
            <NewContributorModal
                user={user}
                file={file}
                show={contributorModalShow}
                handleClose={() => setContributorShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            /> 
            <EditFileModal
                user={user}
                file={file}
                updateFile={updateFile}
                show={editFileModalShow}
                handleClose={() => setEditFileModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowFileModal

// file name (possible Modal.Title), description, uploaded on, last modified, owner

// labels, list all labels associated

// edit and delete components nested in Modal.Footer

// user
// show
// handleClose
// updateFile
// msgAlert
// triggerRefresh