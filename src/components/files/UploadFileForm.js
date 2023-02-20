import { Form, Button, Container } from 'react-bootstrap'

//////////// <----This component takes props from NewFileModal 

const UploadFileForm = (props) => {
    const { file, handleChange, handleSubmit } = props

    // console.log('file in upload form: ', file)

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Group className='m-2 upload-form-group'>
                    <Form.Control
                        type='file'
                        name='file'
                        id='file'
                        value={file}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Container className='d-flex justify-content-end p-0'>
                    <Button className='m-2' id='upload-file-button' type='submit'>Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default UploadFileForm