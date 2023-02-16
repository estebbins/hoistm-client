import { Button } from 'react-bootstrap'

const LabelsIndex = (props) => {
    const { msgAlert, user, labels, labelsError } = props
    
    console.log('labels: ', labels)

    if (labelsError) {
        return <p>Loading...</p>
    }
    // if no pets loaded yet, display 'loading'
    if (!labels) {
        return <p>Loading...</p>
        // otherwise if there are no pets, display that message
    } else if (labels.length === 0) {
        return <p>No files yet, go add some!</p>
    }

    const labelButtons = labels.map(label => {
        return <Button className="m-2" style={{backgroundColor:`${label.color}`}}key={label._id}>{label.name}</Button>
    })

    // return some jsx, a container with all the pet cards
    return (
        <div className="container-sm" >
            { labelButtons }
        </div>
    )
}

// export our component
export default LabelsIndex;


