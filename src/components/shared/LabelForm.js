import { Container, Form, Button } from 'react-bootstrap'

//////////// <----This component takes props from NewLabelModal & EditLabelModal  

const LabelForm = (props) => {
    const { label, handleSubmit, handleChange } = props

    return (
        <Container className='justify-content-center'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='m-2'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        className='label-form-control'
                        placeholder='What is the name of the label'
                        name='label-name'
                        id='name'
                        value={label.name || ''}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className='m-2'>
                    <Form.Label>Color:</Form.Label>
                    <Form.Control 
                        className='label-form-control'
                        type='color'
                        name='color'
                        style={{width: '100%', padding: '0'}}
                        id='type'
                        value={label.color || '#1a1a1a'}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Container className='d-flex justify-content-end p-0'>
                    <Button type='submit' className='m-2' id='label-form-submit'>Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default LabelForm