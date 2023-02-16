import { Form, Button, Container } from 'react-bootstrap'

const FileForm = (props) => {
    const { file, handleChange, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        placeholder="File name..."
                        name='name'
                        id='name'
                        value={file.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                        placeholder="File description..."
                        name='type'
                        id='type'
                        value={file.description}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button className="m-2" type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default FileForm