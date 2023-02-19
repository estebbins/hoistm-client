import React, { useEffect, useState } from 'react'
import { Modal, Button, Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import messages from '../shared/AutoDismissAlert/messages'
import { deleteFile, getOneFile } from '../../api/files'
import { getLabelsOnFile, removeFileFromLabel } from '../../api/labels'
import NewContributorModal from '../contributors/NewContributorModal'
import EditFileModal from './EditFileModal'
import ShowContributor from '../contributors/ShowContributor.js'
import AddLabelModal from '../Labels/AddLabelModal.js'

const ShowFileModal = (props) => {
    console.log('showfilemodal props', props)
    const { user, show, fileId, allLabels, handleClose, msgAlert, triggerRefresh } = props
    // console.log('show props.file', props.file)
    console.log('showFileModal fielId', fileId)
    const [file, setFile] = useState(null)
    const [contributorModalShow, setContributorShow] = useState(false)
    const [editFileModalShow, setEditFileModalShow] = useState(false)
    const [addLabelModalShow, setAddLabelModalShow] = useState(false)
    const [labels, setLabels] = useState([])
    const [updatedFile, setUpdatedFile] = useState(false)
    const [updatedLabels, setUpdatedLabels] = useState(false)
    const [removeLabelId, setRemoveLabelId] = useState(null)
    // console.log('show file file', file)
    // console.log('show file labels', labels)
    // console.log('email', file.owner)

    useEffect(() => {
        if (fileId) {
            getOneFile(user, fileId)
                .then(res => setFile(res.data.file))
                .then(() => setUpdatedLabels(prev => !prev))
                .catch(err => {
                    msgAlert({
                        heading: 'Error getting File',
                        message: 'something went wrong',
                        variant: 'danger'
                    })
                })
        }
    }, [fileId, updatedFile])

    useEffect(() => {
        if (fileId) {
            getLabelsOnFile(user, fileId)
                .then(res => setLabels(res.data.labels))
                .catch(err => {
                    msgAlert({
                        heading: 'Error getting labels',
                        // ! message: messages.getLabelsOnFileFailure
                        message: 'Oops! Could not retrieve labels!',
                        variant: 'danger'
                    })
                })
        }
    }, [fileId, updatedLabels])

    useEffect(() => {
        if(removeLabelId) {
            removeFileFromLabel(user, file, removeLabelId)
                .then(() => {
                    setRemoveLabelId(null)
                    setUpdatedFile(prev => !prev)
                    setUpdatedLabels(prev => !prev)
                    triggerRefresh()
                })
                .catch(err => {
                    msgAlert({
                        heading: 'Error removing label',
                        message: 'something went wrong with removing the label',
                        variant: 'danger'
                    })
                })
        }
    }, [removeLabelId])

    const onClick = (e) => {
        e.preventDefault()
        setRemoveLabelId(e.target.value)
    }

    // useEffect(() => {
    //     // set file to the file passed down from FileIndex & re-render
    //     setFile(props.file)
    // }, [props.file])

    // useEffect(() => {
    //     // !Don't want to delete yet!
    //     // console.log('props.file._id', props.file._id)
    //     // getOneFile(user, props.file._id)
    //     //     .then(res => setFile(res.data.file))
    //     //     .then(()=>triggerRefresh())
    //     //     .catch(err => {
    //     //         msgAlert({
    //     //             heading: 'Error getting File',
    //     //             message: 'something went wrong',
    //     //             variant: 'danger'
    //     //         })
    //     //     })
    //     getLabelsOnFile(user, fileId)
    //         .then(res => setLabels(res.data.labels))
    //         // .then(()=>triggerRefresh())
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error getting labels',
    //                 // ! message: messages.getLabelsOnFileFailure
    //                 message: 'Oops! Could not retrieve labels!',
    //                 variant: 'danger'
    //             })
    //         })
    // }, [updatedLabels])

    // useEffect(() => {
    //     getOneFile(user, props.file._id)
    //         .then(res => setFile(res.data.file))
    //         .then(()=>triggerRefresh())
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error getting File',
    //                 message: 'something went wrong',
    //                 variant: 'danger'
    //             })
    //         })
    // }, [updated])

    // console.log('show file modal labels')

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

    const removeFile = () => {
        deleteFile(user, file)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Hoist with someone elses petard!',
                    message: messages.fileDeleteSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No! Hoisted by our petard!',
                    message: messages.fileDeleteFailure,
                    variant: 'danger'
                })
            })
    }

    const convertTimestamps = (timestamp) => {
        const formatted = new Date(timestamp)
        const date = formatted.getDate()
        const month = formatted.getMonth() + 1;
        const year = formatted.getFullYear()
        const hours = formatted.getHours()
        let minutes = formatted.getMinutes()
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return `${month}/${date}/${year} ${hours}:${minutes}`
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
                    triggerRefresh={() => setUpdatedFile(prev => !prev)}
                />
                )    
            )
        }
    }
    let labelsList
    if (labels && labels.length > 0) {
        labelsList = labels.map((label, i) => (
            // <Button
            //     id='label-buttons'    
            //     className="m-2"
            //     style={{backgroundColor:`${label.color}`}}
            //     key={label._id}
            //     onClick={onClick}
            //     value={label._id}
            // >{label.name}</Button>
            <Button
                    id='label-buttons'    
                    className='m-2 p-1'
                    key={label._id}
                    onClick={onClick}
                    value={label._id}
                ><div id='label-tag' style={{backgroundColor:`${label.color}`}}></div>{label.name}</Button>
        ))
    }

    if (!file) {
        return <></>
    }

    return (
        <>
            <Modal id='show-file-modal' show={show} onHide={handleClose}>
                <Modal.Header id='show-file-header' closeButton closeVariant='white'>
                    <Modal.Title>{file.name}</Modal.Title>
                    <Button
                    // onClick={() => setEditModalShow(true)}
                    variant="warning"
                    id="download"
                ><Image style={{ width: '80%'}} src='/icons/baseline_download_white_48dp.png'/>
                </Button>
                </Modal.Header>
                <Modal.Body id='show-file-body'>
                    <Image id='show-file-image' src={file.url} thumbnail className='border-0' style={{ width: '100%', maxHeight: '400px' }} />
                    {
                        labels && labels.length > 0
                        ?
                        <Container className='p-0 pb-2 d-flex flex-wrap'>
                            { labelsList }
                        </Container>
                        :
                        null
                    }
                    {   file.description
                        ?
                        <p><span className='show-span'>Description:</span> {file.description}</p>
                        :
                        null
                    }
                    <p><span className='show-span'>Hoisted On:</span>    {convertTimestamps(file.createdAt)}</p>
                    <p><span className='show-span'>Last Modified:</span>  {convertTimestamps(file.updatedAt)}</p>
                        {
                            file.owner && user && file.owner._id === user._id
                            ?
                            <>
                                <p><span className='show-span'>Owner:</span> {file.owner.email}</p>
                                <Button 
                                    className="m-2 show-file-button" variant="warning" id='add-contributor-button'
                                    onClick={() => setContributorShow(true)}
                                >
                                    Add Contributor
                                </Button>
                                <Button 
                                    className="m-2 show-file-button" variant="warning" id='edit-file-button'
                                    onClick={() => setEditFileModalShow(true)}
                                >
                                    Edit File
                                </Button>
                                <Button className='m-2 show-file-button' variant='danger' id='delete-file-button' onClick={() => removeFile()}>Delete</Button>
                                <Button 
                                    className="m-2 show-file-button" variant="warning" id='add-label-button'
                                    onClick={() => setAddLabelModalShow(true)}
                                >
                                    Add Label
                                </Button>
                            </>
                            :
                            null
                        }
                        
                        { 
                            file.owner && user && file.owner._id === user._id && file.contributors 
                            ?
                            <Container id='contributor-container'>
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
                //! IS SETUPDATEDFILECORRECT??
                triggerRefresh={() => setUpdatedFile(prev => !prev)}
            /> 
            <EditFileModal
                user={user}
                file={file}
                show={editFileModalShow}
                handleClose={() => setEditFileModalShow(false)}
                msgAlert={msgAlert}
                triggerFileRefresh={() => setUpdatedFile(prev => !prev)}
                triggerRefresh={triggerRefresh}
            />
            <AddLabelModal 
                file={file}
                user={user}
                labels={allLabels}
                show={addLabelModalShow}
                handleClose={() => setAddLabelModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => {
                    setUpdatedLabels(prev => !prev)
                    setUpdatedFile(prev => !prev)
                }}
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