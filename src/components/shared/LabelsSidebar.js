import { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import LabelsIndex from '../Labels/LabelsIndex'
import NewLabelModal from '../Labels/NewLabelModal'

const LabelsSidebar = (props) => {
    const { user, msgAlert, labels, triggerRefresh, labelsError } = props
    
    const [modalShow, setModalShow] = useState(false)

    return (
        <div id='labels-sidebar' className="container-sm d-flex flex-column align-items-center justify-content-start p-0">
            <LabelsIndex
                user={user}
                msgAlert={msgAlert}
                labels={labels}
                labelsError={labelsError}
                triggerRefresh={triggerRefresh}
            />
            <Container className='p-0 d-flex justify-content-end'>
                <Button className="m-2" id='new-label-button' onClick={()=>setModalShow(true)}><Image style={{maxWidth: '24px', pointerEvents: 'none'}} src='/icons/baseline_new_label_white_48dp.png'/></Button>
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