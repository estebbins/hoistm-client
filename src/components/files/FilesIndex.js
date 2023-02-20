import { useState} from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ShowFileModal from './ShowFileModal'
import Container from 'react-bootstrap/Container'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'start'
}

//////////// <----This component takes props from FilesContainer  
//////////// and sends props to ShowFileModal---->

const FilesIndex = (props) => {
    const { msgAlert, user, files, labels, filesError, triggerRefresh, triggerLabelsRefresh } = props
    // console.log('filesindex props', props)
    // State for fileModal show/hide
    const [fileModalShow, setFileModalShow] = useState(false)
    // State for the fileId to send selected file to show file modal
    const [fileId, setFileId] = useState(null)

    // console.log('index fileId', fileId)

    const onClick = (e) => {
        // OnClick of viewfile - set fileId to the selected file's Id & set show modal true
        e.preventDefault()
        setFileId(e.target.value)
        setFileModalShow(true)
    }

    const handleClose = () => {
        // Upon close, set file modal show to false & reset fileId to prevent previous file from populating
        setFileModalShow(false)
        setFileId(null)
    }

    if (filesError) {
        return <p>Error...</p>
    }
    // if no files loaded yet, display 'loading'
    if (!files) {
        return <p>Files Loading...</p>
        // otherwise if there are no files, display that message
    } else if (files.length === 0) {
        return <p>No files yet, go add some!</p>
	}

    const fileCards = files.map((file, i) => {
        return (
            <>
                <Card className='file-card' key={i}>
                    <Card.Header className='file-card-header'>{ file.name.length > 16  ? file.name.substring(0,13) + '...' : file.name}</Card.Header>
                    <Card.Body className='file-card-body'>
                        <Image style={{ width: '138px', height: '134px' }} className='file-card-image' src={file.url} thumbnail />
                        <Container className='d-flex justify-content-start px-1 align-items-end p-0 pb-2 pt-1' id='file-card-container'>
                            <Button type='submit' className='file-card-button me-2' onClick={onClick} value={file._id}><Image style={{ maxWidth: '18px', pointerEvents: 'none' }} src='/icons/outline_launch_white_24dp.png' /></Button>
                            <p className='fs-6 m-0 fw-semibold align-middle d-inline' id='view-file-text'>View File</p>
                        </Container>
                    </Card.Body>
                </Card>
            </>
        )
    })
    
    // return JSX with filecards
    return (
        <>
            <div className="container-fluid p-0" style={cardContainerStyle}>
                { fileCards }
            </div>
            <ShowFileModal
                user={user}
                fileId={fileId}
                show={fileModalShow}
                handleClose={handleClose}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                triggerLabelsRefresh={triggerLabelsRefresh}
                allLabels={labels}
            />
        </>
    )
}

export default FilesIndex