import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import LabelsIndex from '../Labels/LabelsIndex'
import NewLabelModal from '../Labels/NewLabelModal'

const LabelsSidebar = (props) => {
    const { user, msgAlert, labels, triggerRefresh, labelsError } = props
    
    const [modalShow, setModalShow] = useState(false)

    return (
        <div className="container-sm">
            <LabelsIndex
                user={user}
                msgAlert={msgAlert}
                labels={labels}
                labelsError={labelsError}
            />
            <Button className="m-2" onClick={()=>setModalShow(true)}>Create New Label</Button>
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