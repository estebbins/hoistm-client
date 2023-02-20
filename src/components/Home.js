import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import FilesContainer from './shared/FilesContainer.js'
import LabelsSidebar from './shared/LabelsSidebar'
import { getAllLabels } from '../api/labels'
import NewFileModal from './files/NewFileModal'
import { showLabel } from '../api/labels'

const homeContainerStyles = {
	backgroundColor: '#000000',
	color: '#ffffff'
}
//////////// <----This component takes props from App.js  
//////////// and sends props to LabelsSideBar, FileContainer, and NewFileModal---->

const Home = (props) => {
    const { msgAlert, user } = props
    // States for labels index and to pass to files components
	const [labels, setLabels] = useState(null)
	const [labelsError, setLabelsError] = useState(false)
    // State to show or hide new file modal
	const [newFileModalShow, setNewFileModalShow] = useState(false)
    // States for rerendering components when updates occur
    const [updatedFiles, setUpdatedFiles] = useState(false)
    const [updatedLabels, setUpdatedLabels] = useState(false)
    // States for label filter & header
    const [labelFilter, setLabelFilter] = useState(null)
    const [filterOn, setFilterOn] = useState(false)
    const [labelName, setLabelName] = useState(null)

    useEffect (() => {
        // If label filter is not null, get & set the name of the label
        if (labelFilter && user) {
            showLabel(user, labelFilter)
                .then(res => setLabelName(res.data.label.name))
        }
    }, [labelFilter])

	useEffect(() => {
        // Get all the labels for the user and set labels
        if (user) {
            getAllLabels(user)
                .then(res => setLabels(res.data.labels))
                .catch(err => {
                    // Set labels error true
                    setLabelsError(true)
                })
        }
        // This updates if someone adds or edits a label
    }, [updatedLabels])

    const onLabelFilter = (e) => {
        // If a label in the sidebar is clicked, the filter turns 'on'
        setFilterOn(true)
        // the label filter is set to the labels' id
        setLabelFilter(e.target.value)
    }
    const clearLabelFilter = () => {
        // When user clicks 'clear filter', the filter turns off
        setFilterOn(false)
        // Label is set to null
        setLabelFilter(null)
    }

	return (
		<>
			<Container fluid className="m-0" style={homeContainerStyles}>
				<Row>
					<Col md={2} id='labels-column' className='container-fluid'>
						<p className='fs-4 mt-4 mb-0 fw-semibold align-middle' id='labels-header'>Labels</p>
						<hr id='line' className='mt-0 border border-1'/>
						<LabelsSidebar 
                            msgAlert={msgAlert} 
                            user={user} 
                            labels={labels}
                            abelsError={labelsError} 
                            triggerRefresh={() => setUpdatedLabels(prev => !prev)}
                            onLabelFilter={onLabelFilter}
                        />
					</Col>
					<Col md={10}>
						<Row>
						<Col md={12} id='utilities-row'>
							<Container fluid className='p-0'>
								<Button onClick={() => setNewFileModalShow(true)} id="new-file-button"><Image style={{ maxWidth: '32px', pointerEvents: 'none'}} src='/icons/baseline_upload_white_48dp.png'/>
								</Button>
								<p className='fs-4 m-0 fw-semibold align-middle d-inline' id='hoist-header'>Hoist a New File</p>
                                {
                                    filterOn && labelName
                                    ?
                                    <>
                                        <p>Filtered on: {labelName}</p>
                                        <Button onClick={() => clearLabelFilter()}>Clear Filter</Button>
                                    </>
                                    :
                                    null
                                }
							</Container>
						</Col>
						</Row>
						<Row>
							<FilesContainer 
                                msgAlert={msgAlert} 
                                user={user} 
                                labels={labels} 
                                triggerRefresh={() => setUpdatedFiles(prev => !prev)} 
                                triggerLabelsRefresh={() => setUpdatedLabels(prev => !prev)}
                                updatedFiles={updatedFiles} 
                                filterOn={filterOn}
                                labelFilter={labelFilter}
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
