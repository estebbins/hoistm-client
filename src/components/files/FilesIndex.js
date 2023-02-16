import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import ShowFileModal from './ShowFileModal'
// import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllFiles } from '../../api/files'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object, they're a quick easy way to add focused css properties to our react componenets
// styling objects use any CSS style, but in camelCase because it's in JavaScript
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

// PetsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet

const FilesIndex = (props) => {
    const [files, setFiles] = useState(null)
    const [error, setError] = useState(false)
    const [fileModalShow, setFileModalShow] = useState(false)
    // const [updated, setUpdated] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert, user } = props

    // get our pets from the api when the component mounts
    // empty dependency array means this only runs one time
    useEffect(() => {
        getAllFiles(user)
            .then(res => setFiles(res.data.files))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting files',
                    message: messages.getFilesFailure,
                    variant: 'danger'
                })
                setError(true)
            })
    }, )

    // if error, display an error
    if (error) {
        return <p>Loading...</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!files) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (files.length === 0) {
        return <p>No files yet, go add some!</p>
    }
    
    // once we have an array of pets, loop over them
    // produce one card for every pet
    const fileCards = files.map(file => (
        <Card key={file.id} style={{ width: '30%', margin: 5 }}>
            <Card.Header>{file.name}</Card.Header>
            <Card.Body>
                {/* <Link to={`/files/${file._id}`}><Image src={file.url} thumbnail /></Link> */}
                <Button className='m-2' variant='link' onClick={() => setFileModalShow(true)}><Image src={file.url} thumbnail /></Button>
            </Card.Body>
            <ShowFileModal
                user={user}
                file={file}
                show={fileModalShow}
                handleClose={() => setFileModalShow(false)}
                msgAlert={msgAlert}
            />
        </Card>
    ))
    
    // return some jsx, a container with all the pet cards
    return (
        <div className="container-md" style={cardContainerStyle}>
            { fileCards }
        </div>
    )
}

// export our component
export default FilesIndex