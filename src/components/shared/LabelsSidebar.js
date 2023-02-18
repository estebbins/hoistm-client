import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
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
            <Button className="m-2" id='new-label-button' onClick={()=>setModalShow(true)}><Image src='/icons/baseline_new_label_white_24dp.png'/>New Label</Button>
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