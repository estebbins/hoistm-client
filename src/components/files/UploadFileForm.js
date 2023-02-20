import { Form, Button, Container } from 'react-bootstrap'

const UploadFileForm = (props) => {
    const { file, handleChange, handleSubmit } = props

    console.log('file in upload form: ', file)

    return (
        <Container className="justify-content-center">
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group className="m-2 upload-form-group">
                    <Form.Control
                        type='file'
                        name='file'
                        id='file'
                        value={file}
                        onChange={handleChange}
                    />
                </Form.Group>
            {/* <div class="mb-3">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" id="formFile" />
            </div> */}
                {/* <Form.Group className="m-2">
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
                </Form.Group> */}
                <Container className='d-flex justify-content-end p-0'>
                    <Button className='m-2' id='upload-file-button' type='submit'>Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default UploadFileForm