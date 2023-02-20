import { Form, Button, Container } from 'react-bootstrap'

const FileForm = (props) => {
    const { file, handleChange, handleSubmit, heading } = props
    console.log('fileform file')

    return (
        <Container className='justify-content-center'>
            {/* <h3>{heading}</h3> */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        className='edit-form-control'
                        placeholder='File name...'
                        name='name'
                        id='name'
                        value={file.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        className='edit-form-control'
                        placeholder='File description...'
                        name='description'
                        id='description'
                        value={file.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Container className='d-flex justify-content-end p-0'>
                    <Button className='m-2' id='edit-file-submit' type='submit'>Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default FileForm