import { useState, useEffect } from 'react'
// import { Modal } from 'react-bootstrap'

import LabelsIndex from '../Labels/LabelsIndex'

const LabelsSidebar = (props) => {
    const { user, msgAlert, labels, labelsError } = props

    return (
        <div className="container-sm">
            <LabelsIndex
                user={user}
                msgAlert={msgAlert}
                labels={labels}
                labelsError={labelsError}
            />
        </div>
    )
}

export default LabelsSidebar