import { Container, Image } from 'react-bootstrap'

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
        return <Container className="m-2 d-flex justify-content-center" style={{ backgroundColor: `${label.color}`, width: '100%' }} key={label._id}>
            <Image id='label-icon' src='/icons/label_white_24dp.svg' style={{ maxWidth: '20px' }} className='me-1'/>
            <span>{label.name}</span>
        </Container>
    })

    // return some jsx, a container with all the pet cards
    return (
        <>
            <div className="container-sm" >
                { labelButtons }
            </div>
        </>
    )
}

// export our component
export default LabelsIndex;


