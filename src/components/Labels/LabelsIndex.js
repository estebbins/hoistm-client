import { Button, Image, Container } from 'react-bootstrap'
import EditLabelModal from './EditLabelModal'
import { useState } from 'react'

//////////// <----This component takes props from LabelsSideBar 
//////////// and sends props to EditLabelModal---->

const LabelsIndex = (props) => {
    const { msgAlert, user, labels, labelsError, triggerRefresh, onLabelFilter } = props
    // State for edit label modal to show/hide
    const [editModalShow, setEditModalShow] = useState(false)
    // State for which label is selected to edit
    const [updateLabel, setUpdateLabel] = useState({})
    
    // console.log('labels in labelsIndex: ', labels)

    if (labelsError) {
        return <p>Labels error...</p>
    }
    // if no labels, display loading
    if (!labels) {
        return <p>Loading Labels...</p>
    // otherwise if there are no labels display that message
    } else if (labels.length === 0) {
        return <p>No labels yet, go add some!</p>
    }

    const onClick = (e) => {
        // Upon clicking the edit icon - set the label to be updated to the target value
        // Target value must be parsed since data is coming from label value
        // console.log('labels index e value', e.target.value)
        setUpdateLabel(JSON.parse(e.target.value))
        // Show the edit labelModal
        setEditModalShow(true)
    }
    // Create all the Label Buttons
    // One for Filtering the file list, and the other for editing the label
    const labelButtons = labels.map((label, i) => {
        return (
            <Container className='mb-2 px-0 label-container-index' key={i}>
                <Button
                    className='label-buttons m-0'
                    onClick={onLabelFilter}
                    value={label._id}
                ><div id='label-tag' style={{ backgroundColor: `${label.color}`, boxShadow: `inset -6px 0px 0px 0px ${label.color}, 2px -2px 0px 0px #5A5A5A inset, 1px -1px 0px 0px #4A4A4A inset` }}></div>{label.name}<small style={{pointerEvents: 'none'}} className='label-length'>{label.fileRef.length}</small></Button>
                <Button
                    variant='warning'
                    id='show-contributor-edit'
                    onClick={onClick}
                    value={JSON.stringify(label)}
                ><Image style={{ width: '80%', pointerEvents: 'none', opacity: '.5'}} src='/icons/baseline_edit_white_24dp.png'/>
                </Button>
            </Container>
        )
})

    // return JSX with the labelButtons and the editLabelModal
    return (
        <>
            <div className='container-sm d-flex flex-column justify-content-start p-0'>
                { labelButtons }
            </div>
            <EditLabelModal
                    user={user}
                    editLabel={updateLabel}
                    msgAlert={msgAlert}
                    triggerRefresh={triggerRefresh}
                    show={editModalShow}
                    handleClose={() => setEditModalShow(false)}
                />
        </>
    )
}

export default LabelsIndex


