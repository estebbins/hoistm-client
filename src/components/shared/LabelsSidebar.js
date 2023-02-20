import { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import LabelsIndex from '../Labels/LabelsIndex'
import NewLabelModal from '../Labels/NewLabelModal'

//////////// This component takes props from Home.js  
//////////// and sends props to LabelsIndex, NewLabelModal

const LabelsSidebar = (props) => {
    const { user, msgAlert, labels, triggerRefresh, labelsError, onLabelFilter } = props
    // State for newlabelmodal to show or hide
    const [modalShow, setModalShow] = useState(false)

    return (
        <div id='labels-sidebar' className="container-sm d-flex flex-column align-items-center justify-content-start p-0">
            <LabelsIndex
                user={user}
                msgAlert={msgAlert}
                labels={labels}
                labelsError={labelsError}
                triggerRefresh={triggerRefresh}
                onLabelFilter={onLabelFilter}
            />
            <hr id='new-label-line' className='mt-2 border border-1'/>
            <Container className='p-0 d-flex justify-content-start align-items-center mt-0 mb-2'>
                <Button className="me-2" id='new-label-button' onClick={() => setModalShow(true)}><Image style={{ maxWidth: '24px', pointerEvents: 'none' }} src='/icons/baseline_new_label_white_48dp.png' /></Button>
                <p className='fs-5 m-0 fw-semibold align-middle d-inline' id='new-label-text'>New Label</p>
            </Container>
            <NewLabelModal 
                user={user}
                show={modalShow}
                msgAlert={msgAlert}
                handleClose={()=>setModalShow(false)}
                triggerRefresh={triggerRefresh}
            />
        </div>
    )
}

export default LabelsSidebar