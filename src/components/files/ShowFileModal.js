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

const ShowFileModal = (props) => {
    console.log('showfilemodal props', props)
    const { user, show, fileId, allLabels, handleClose, msgAlert, triggerRefresh, triggerLabelsRefresh } = props
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
    const [imgFromStorage, setImgFromStorage] = useState('')
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
                    triggerLabelsRefresh()
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
        // triggerLabelsRefresh()
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
                    className='m-1 label-buttons mb-0'
                    key={label._id}
                    onClick={onClick}
                    value={label._id}
                ><div id='label-tag' style={{backgroundColor:`${label.color}`}}></div>{label.name}</Button>
        ))
    }
    // console.log(imgFromStorage)

    // source code for downloads: https://stackoverflow.com/questions/70534780/convert-weird-image-characters-for-use-in-image-src

    const blobToDataUrl = (blob, callback) => {
        // console.log('blob', blob)
        let a = new FileReader()
        // console.log('a:', a)
        let link = document.createElement('a')

        let linkArray = file.awsKey.split('_')
        linkArray.pop()
        let downloadLink = linkArray.join('')
        console.log(downloadLink)
        link.download = downloadLink
        // console.log('split awsKey', file.awsKey.split('_'))
        a.onload = function (e) {
            // console.log('e.target.result', e.target.result)
            link.href = e.target.result
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            // let targetResult = e.target.result
            callback(link.href)
            // Code for window.open: https://stackoverflow.com/questions/5141910/javascript-location-href-to-open-in-new-window-tab
            // window.open(targetResult, '_blank')
        }
        a.readAsDataURL(blob)
    }

    const downloadFileFromAWS = (e) => {
        downloadFile(user, file)
            .then((response) => {
                console.log('download response: ', response)
                blobToDataUrl(response.data, function(dataurl) {
                    // console.log('dataurl', dataurl)
                    setImgFromStorage(dataurl)
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
                    type="submit"
                    onClick={downloadFileFromAWS}
                    variant="warning"
                    id="download"
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
                                        className="m-1 show-file-button" variant="warning" id='add-contributor-button'
                                        onClick={() => setContributorShow(true)}
                                    ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_person_add_alt_1_white_24dp.png'/>
                                    </Button>
                                    <Button 
                                        className="m-1 show-file-button" variant="warning" id='edit-file-button'
                                        onClick={() => setEditFileModalShow(true)}
                                    ><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_edit_note_white_24dp.png'/>
                                    </Button>
                                    {/* <Button className='m-1 show-file-button' variant='danger' id='delete-file-button' onClick={() => removeFile()}><Image style={{ width: '100%', pointerEvents: 'none'}} src='/icons/baseline_delete_forever_white_24dp.png'/></Button> */}
                                    <Button 
                                        className="m-1 show-file-button" variant="warning" id='add-label-button'
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

// file name (possible Modal.Title), description, uploaded on, last modified, owner

// labels, list all labels associated

// edit and delete components nested in Modal.Footer

// user
// show
// handleClose
// updateFile
// msgAlert
// triggerRefresh