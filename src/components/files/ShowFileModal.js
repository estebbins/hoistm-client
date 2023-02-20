import React, { useEffect, useState } from 'react'
import { Modal, Button, Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import messages from '../shared/AutoDismissAlert/messages'
import { deleteFile, getOneFile, downloadFile } from '../../api/files'
import { getLabelsOnFile, removeFileFromLabel } from '../../api/labels'
import NewContributorModal from '../contributors/NewContributorModal'
import EditFileModal from './EditFileModal'
import ShowContributor from '../contributors/ShowContributor.js'
import AddLabelModal from '../Labels/AddLabelModal.js'

//////////// <----This component takes props from FilesIndex 
//////////// and sends props to AddLabelModal, ShowContributor, NewContributorModal, EditFileModal---->

const ShowFileModal = (props) => {
    // console.log('showfilemodal props', props)
    const { user, show, fileId, allLabels, handleClose, msgAlert, triggerRefresh, triggerLabelsRefresh } = props

    // console.log('showFileModal fileId', fileId)
    // State for which file to show
    const [file, setFile] = useState(null)
    // States for layered modals
    const [contributorModalShow, setContributorShow] = useState(false)
    const [editFileModalShow, setEditFileModalShow] = useState(false)
    const [addLabelModalShow, setAddLabelModalShow] = useState(false)
    // State for the labels associated with the file
    const [labels, setLabels] = useState([])
    // Update States
    const [updatedFile, setUpdatedFile] = useState(false)
    const [updatedLabels, setUpdatedLabels] = useState(false)
    // State for labelId selected for removal
    const [removeLabelId, setRemoveLabelId] = useState(null)
    // State for file download
    const [fileFromStorage, setFileFromStorage] = useState('')

    // console.log('show file file', file)
    // console.log('show file labels', labels)
    // console.log('email', file.owner)

    useEffect(() => {
        // If the fileId changes or file is updated, refresh
        // If fileId is not null, then get the file associated with that from API call
        if (fileId) {
            getOneFile(user, fileId)
                // set file to that file
                .then(res => setFile(res.data.file))
                // Refresh labels
                .then(() => setUpdatedLabels(prev => !prev))
                .catch(err => {
                    msgAlert({
                        heading: 'Error',
                        message: messages.getOneFileFailure,
                        variant: 'danger'
                    })
                })
        }
    }, [fileId, updatedFile])

    useEffect(() => {
        // If the fileId changes or labels are updated, refresh
       // If fileId is not null, then get the labels that have that file in their fileRef, through the API call
        if (fileId) {
            getLabelsOnFile(user, fileId)
                .then(res => setLabels(res.data.labels))
                .catch(err => {
                    msgAlert({
                        heading: 'Error',
                        message: messages.getLabelsOnFileFailure,
                        variant: 'danger'
                    })
                })
        }
    }, [fileId, updatedLabels])

    useEffect(() => {
        // If the removeLabelID changes, refresh
        // If there is a removeLabelId, then find the label and remove the file
        if(removeLabelId) {
            removeFileFromLabel(user, file, removeLabelId)
                .then(() => {
                    // Reset the removeLabelId
                    setRemoveLabelId(null)
                    // Refresh other components
                    setUpdatedFile(prev => !prev)
                    setUpdatedLabels(prev => !prev)
                    triggerRefresh()
                    triggerLabelsRefresh()
                })
                .catch(err => {
                    msgAlert({
                        heading: 'Error removing label',
                        message: messages.removeLabelFailure,
                        variant: 'danger'
                    })
                })
        }
    }, [removeLabelId])

    const onClick = (e) => {
        // When a label is clicked, set the removeLabelId to that label's ID
        e.preventDefault()
        setRemoveLabelId(e.target.value)
    }

    const removeFile = () => {
        // API Call to delete file document
        deleteFile(user, file)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success!',
                    message: messages.fileDeleteSuccess,
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.fileDeleteFailure,
                    variant: 'danger'
                })
            })
    }

    const convertTimestamps = (timestamp) => {
        // Converting timestamps from mongo to readable format
        const formatted = new Date(timestamp)
        const date = formatted.getDate()
        const month = formatted.getMonth() + 1;
        const year = formatted.getFullYear()
        const hours = formatted.getHours()
        let minutes = formatted.getMinutes()
        if (minutes < 10) {
            minutes = '0' + minutes
        }
        return `${month}/${date}/${year} ${hours}:${minutes}`
    }

    // Create ShowContributor components
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
    // Create label remove buttons
    let labelsList
    if (labels && labels.length > 0) {
        labelsList = labels.map((label, i) => (
            <Button
                    className='m-1 label-buttons mb-0'
                    id='show-file-label-buttons'
                    key={label._id}
                    onClick={onClick}
                    value={label._id}
                ><div id='label-tag' style={{backgroundColor:`${label.color}`}}></div>{label.name}</Button>
        ))
    }

    // source code for downloads: https://stackoverflow.com/questions/70534780/convert-weird-image-characters-for-use-in-image-src

    const blobToDataUrl = (blob, callback) => {
        // console.log('blob', blob)
        let a = new FileReader()
        // console.log('a:', a)
        // Create HTML element
        let link = document.createElement('a')
        // Split the name of the file
        let linkArray = file.awsKey.split('_')
        // Remove the last item in the array & rejoin the name to get the extension(the date/time that creates the unique AWS key)
        linkArray.pop()
        let downloadLink = linkArray.join('')
        // console.log('download link', downloadLink)
        // Set the download attribute of the a tag to the downloadLink
        link.download = downloadLink

        a.onload = function (e) {
            // Onload of the filereader, set the href to the file data
            // console.log('e.target.result', e.target.result)
            link.href = e.target.result
            // Append the link to the document & "click" from backend, then remove the link
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // let targetResult = e.target.result
            callback(link.href)
        }
        // Read the blob as a URL
        a.readAsDataURL(blob)
    }

    const downloadFileFromAWS = (e) => {
        // Onclick of download button, send API Call to get file data
        downloadFile(user, file)
            .then((response) => {
                // console.log('download response: ', response)
                blobToDataUrl(response.data, function(dataurl) {
                    // console.log('dataurl', dataurl)
                    // Set the file to the data URL
                    setFileFromStorage(dataurl)
                })
            })
            .catch(err => console.log(err))
    }


    if (!file) {
        return <></>
    }

    return (
        <>
            <Modal id='show-file-modal' show={show} onHide={handleClose}>
                <Modal.Header id='show-file-header' closeButton closeVariant='white'>
                    <Button
                    type='submit'
                    onClick={downloadFileFromAWS}
                    variant='warning'
                    id='download'
                    value={JSON.stringify(file)}
                ><Image style={{ maxWidth: '32px', pointerEvents: 'none'}} src='/icons/baseline_download_white_48dp.png'/>
                    </Button>
                    <Modal.Title>{file.name}</Modal.Title>
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
                    <Container className='p-0 d-flex justify-content-between'>
                        <p><span className='show-span'>Hoisted On:</span>    {convertTimestamps(file.createdAt)}</p>
                        <p><span className='show-span'>Last Modified:</span>  {convertTimestamps(file.updatedAt)}</p>
                    </Container>
                        {
                            file.owner && user && file.owner._id === user._id
                            ?
                            <Container className='d-flex p-0 justify-content-between'>
                                <p className='mb-0'><span className='show-span'>Owner:</span> {file.owner.email}</p>
                                <Container className='d-flex p-0 justify-content-end' style={{maxWidth: '50%', margin: 0 }}>
                                    <Button 
                                        className='m-1 show-file-button' variant='warning' id='add-contributor-button'
                                        onClick={() => setContributorShow(true)}
                                    ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_person_add_alt_1_white_24dp.png'/>
                                    </Button>
                                    <Button 
                                        className='m-1 show-file-button' variant='warning' id='edit-file-button'
                                        onClick={() => setEditFileModalShow(true)}
                                    ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_edit_note_white_24dp.png'/>
                                    </Button>
                                    <Button 
                                        className='m-1 show-file-button' variant='warning' id='add-label-button'
                                        onClick={() => setAddLabelModalShow(true)}
                                    ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_new_label_white_24dp.png'/>
                                        </Button>
                                    </Container>
                            </Container>
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
                removeFile={removeFile}
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
                    triggerLabelsRefresh()
                }}
            />
        </>
    )
}

export default ShowFileModal