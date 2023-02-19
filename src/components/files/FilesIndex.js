import { useState} from 'react'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ShowFileModal from './ShowFileModal'

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
                    <Card.Header className='file-card-header'>{file.name}</Card.Header>
                    <Card.Body className='file-card-body'>
                        <Image style={{ width: '138px', height: '134px' }} className='file-card-image'src={file.url} thumbnail/>
                        <Button type='submit' className='file-card-button pe-1' onClick={onClick} value={file._id}><Image style={{ width: '25%' }} className='pe-1' src='/icons/outline_launch_white_24dp.png' />View File</Button>
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