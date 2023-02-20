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
	// console.log('props in home', props)

	const { msgAlert, user } = props

	// const [files, setFiles] = useState(null)
	// const [filesError, setFilesError] = useState(false)
	
	const [labels, setLabels] = useState(null)
	const [labelsError, setLabelsError] = useState(false)

	const [newFileModalShow, setNewFileModalShow] = useState(false)

    const [updatedFiles, setUpdatedFiles] = useState(false)
    const [updatedLabels, setUpdatedLabels] = useState(false)

    // useEffect(() => {
    //     console.log(updatedFiles)
    // }, [updatedFiles])

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
    }, [updatedLabels])

	return (
		<>
			<Container fluid className="m-0" style={homeContainerStyles}>
				<Row>
					<Col md={2} id='labels-column' className='container-fluid'>
						<p className='fs-4 mt-4 mb-0 fw-semibold align-middle' id='labels-header'>Labels</p>
						<hr id='line' className='mt-0 border border-1'/>
						<LabelsSidebar msgAlert={msgAlert} user={user} labels={labels} labelsError={labelsError} triggerRefresh={() => setUpdatedLabels(prev => !prev)}/>
					</Col>
					<Col md={10}>
						<Row>
						<Col md={12} id='utilities-row'>
							<Container fluid className='p-0'>
								{/* <Button 
                                    className="m-2" id='new-file-button' onClick={() => setNewFileModalShow(true)}
                                >
                                    Hoist New File
								</Button> */}
								<Button onClick={() => setNewFileModalShow(true)} id="new-file-button"><Image style={{ maxWidth: '32px', pointerEvents: 'none'}} src='/icons/baseline_upload_white_48dp.png'/>
								</Button>
								<p className='fs-4 m-0 fw-semibold align-middle d-inline' id='hoist-header'>Hoist a New File</p>
								{/* <hr className='mt-0 border'/> */}
							</Container>
						</Col>
						</Row>
						<Row>
							<FilesContainer msgAlert={msgAlert} user={user} labels={labels} 
                            triggerRefresh={() => setUpdatedFiles(prev => !prev)} 
                            updatedFiles={updatedFiles}
                            />
						</Row>
					</Col>
				</Row>
			</ Container>
			<NewFileModal
                user={user}
                show={newFileModalShow}
                handleClose={() => setNewFileModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdatedFiles(prev => !prev)}
            />
		</>
	)
}

export default Home
