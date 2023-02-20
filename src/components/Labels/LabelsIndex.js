import { Button, Image, Container } from 'react-bootstrap'
import EditLabelModal from './EditLabelModal'
import { useState, useEffect } from 'react'

const LabelsIndex = (props) => {
    const { msgAlert, user, labels, labelsError, triggerRefresh, onLabelFilter } = props

    const [editModalShow, setEditModalShow] = useState(false)
    const [updateLabel, setUpdateLabel] = useState({})

    // useEffect(()=>{console.log('updated label!!!!', updateLabel)}, [updateLabel])
    
    // console.log('labels: ', labels)

    if (labelsError) {
        return <p>Labels error...</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!labels) {
        return <p>Loading Labels...</p>
        // otherwise if there are no pets, display that message
    } else if (labels.length === 0) {
        return <p>No files yet, go add some!</p>
    }

    const onClick = (e) => {
        console.log('labels index e value', e.target.value)
        setUpdateLabel(JSON.parse(e.target.value))
        console.log('!!!!!!UPDATELABEL', updateLabel)
        setEditModalShow(true)
    }

    const labelButtons = labels.map((label, i) => {
        // console.log('mapped labels', label)
        return (
            <Container id='label-container-index' className='mb-2 px-0'>
                <Button
                    id='label-buttons'    
                    className='m-2'
                    key={i}
                    onClick={onLabelFilter}
                    value={label._id}
                ><div id='label-tag' style={{backgroundColor:`${label.color}`, boxShadow: `inset -6px 0px 0px 0px ${label.color}, 2px -2px 0px 0px #5A5A5A inset, 1px -1px 0px 0px #4A4A4A inset`}}></div>{label.name}</Button>
                <Button
                    // onClick={() => setEditModalShow(true)}
                    variant="warning"
                    className="m-"
                    id="show-contributor-edit"
                    onClick={onClick}
                    value={JSON.stringify(label)}
                ><Image style={{ width: '90%', pointerEvents: 'none'}} src='/icons/baseline_edit_white_24dp.png'/>
                </Button>
            </Container>
        )
})

    // return some jsx, a container with all the pet cards
    return (
        <>
            <div className='container-sm d-flex flex-column justify-content-start p-0' >
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

// export our component
export default LabelsIndex


