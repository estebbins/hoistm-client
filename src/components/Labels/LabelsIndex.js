import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap'
// import LoadingScreen from '../shared/LoadingScreen'

// api function from our api file
import { getAllLabels } from '../../api/labels'

// need our messages from our autodismissalert directory
import messages from '../shared/AutoDismissAlert/messages'

// PetsIndex will make a request to the API for all pets
// once it receives a response, display a card for each pet

const LabelsIndex = (props) => {
    const [labels, setLabels] = useState(null)
    const [error, setError] = useState(false)

    // pull the message alert (msgAlert) from props
    const { msgAlert, user } = props

    // get our pets from the api when the component mounts
    // empty dependency array means this only runs one time
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
                setError(true)
            })
    }, )

    // if error, display an error
    if (error) {
        return <p>ERR</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!labels) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (labels.length === 0) {
        return <p>No lables to show!</p>
    } 
    const labelButtons = labels.map(label => {
        return <Button className="m-2" style={{backgroundColor:`${label.color}`}}key={label._id}>{label.name}</Button>
    })

    // return some jsx, a container with all the pet cards
    return (
        <div className="container-md" >
            { labelButtons }
        </div>
    )
}

// export our component
export default LabelsIndex;


