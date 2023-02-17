import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ShowFileModal from './ShowFileModal'

const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'start'
}

const FilesIndex = (props) => {

    const { msgAlert, user, files, labels, filesError } = props

    const [fileModalShow, setFileModalShow] = useState(false)
    // const [updated, setUpdated] = useState(false)
    
    if (filesError) {
        return <p>Loading...</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!files) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (files.length === 0) {
        return <p>No files yet, go add some!</p>
	}

    const fileCards = files.map(file => (
        <Card key={file._id} style={{ width: '30%' }}>
            <Card.Header>{file.name}</Card.Header>
            <Card.Body>
                <Button className='m-2' variant='link' onClick={() => setFileModalShow(true)}><Image src={file.url} thumbnail /></Button>
            </Card.Body>
            <ShowFileModal
                user={user}
                file={file}
                labels={labels}
                show={fileModalShow}
                handleClose={() => setFileModalShow(false)}
                msgAlert={msgAlert}
            />
        </Card>
    ))
    
    // return some jsx, a container with all the pet cards
    return (
        <div className="container-fluid" style={cardContainerStyle}>
            { fileCards }
        </div>
    )
}

// export our component
export default FilesIndex