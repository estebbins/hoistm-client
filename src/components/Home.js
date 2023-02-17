import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import FilesContainer from './shared/FilesContainer.js'
import LabelsSidebar from './shared/LabelsSidebar'
import { getAllFiles } from '../api/files'
import { getAllLabels } from '../api/labels'
import NewFileModal from './files/NewFileModal'

import messages from '../components/shared/AutoDismissAlert/messages'

const homeContainerStyles = {
	backgroundColor: '#000000',
	color: '#ffffff'
}

const Home = (props) => {
	console.log('props in home', props)

	const { msgAlert, user } = props

	const [files, setFiles] = useState(null)
	const [filesError, setFilesError] = useState(false)
	
	const [labels, setLabels] = useState(null)
	const [labelsError, setLabelsError] = useState(false)

	const [newFileModalShow, setNewFileModalShow] = useState(false)

    const [updated, setUpdated] = useState(false)

	useEffect(() => {
        getAllFiles(user)
            .then(res => setFiles(res.data.files))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting files',
                    message: 'failed to get files',
                    variant: 'danger'
                })
                setFilesError(true)
            })
    }, [updated])

	useEffect(() => {
        getAllLabels(user)
            .then(res => setLabels(res.data.labels))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting labels',
                    // ! message: messages.getLabelsFailure
                    message: 'Sorry about your labels',
                    variant: 'danger'
                })
                setLabelsError(true)
            })
    }, [updated])

	return (
		<>
			<Container fluid className="m-0" style={homeContainerStyles}>
				<Row>
					<Col md={2} id='labels-column' className='pe-2'>
						<p className='fs-3 mt-1 mb-2 fw-semibold align-middle'><Image id='title-label-icon' className='pb-1' src='/icons/label_white_24dp.svg'/>Labels</p>
						<hr className='mt-0 border'/>
						<LabelsSidebar msgAlert={msgAlert} user={user} labels={labels} labelsError={labelsError} triggerRefresh={() => setUpdated(prev => !prev)}/>
					</Col>
					<Col md={10}>
						<Row>
						<Col md={12} id='utilities-row'>
							<Container fluid>
							<Button 
                                    className="m-2" variant="dark" onClick={() => setNewFileModalShow(true)}
                                >
                                    Hoist New File
								</Button>
								<hr className='mt-0 border'/>
							</Container>
						</Col>
						</Row>
						<Row>
							<FilesContainer msgAlert={msgAlert} user={user} files={files} filesError={filesError} labels={labels} triggerRefresh={() => setUpdated(prev => !prev)} />
						</Row>
					</Col>
				</Row>
			</ Container>
			<NewFileModal
                user={user}
                show={newFileModalShow}
                handleClose={() => setNewFileModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
		</>
	)
}

export default Home
