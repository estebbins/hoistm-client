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

const FilesIndex = (props) => {

    console.log('filesindex props', props)
    const { msgAlert, user, files, labels, filesError, triggerRefresh } = props

    const [fileModalShow, setFileModalShow] = useState(false)
    const [fileId, setFileId] = useState(null)
    // console.log('index files', files)
    // console.log('index file', showFile)
    console.log('index fileId', fileId)
    // useEffect(()=> {
    //     console.log('!!FilesIndex UseEffect Triggered!!!')
    //     triggerRefresh()
    // },[updated])

    const onClick = (e) => {
        // console.log('e', e.target)
        console.log('!!!!!filesindex onClick Event!!!!!!')
        e.preventDefault()
        // console.log('file index e value', e.target.value)
        setFileId(e.target.value)
        setFileModalShow(true)
    }

    const handleClose = () => {
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
    
    // return some jsx, a container with all the pet cards
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
                allLabels={labels}
            />
        </>
    )
}

// export our component
export default FilesIndex