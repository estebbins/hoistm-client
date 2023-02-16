import { Container, Form, Button } from 'react-bootstrap'

const LabelForm = (props) => {
    const { user, label, handleSubmit, handleChange, heading } = props
    console.log(label)

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the name of the label"
                        name="name"
                        id="name"
                        defaultValue={ label.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Color:</Form.Label>
                    <Form.Control 
                        type="color"
                        name="color"
                        id="type"
                        defaultValue={ label.color }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button type="submit" className="m-2">Submit</Button>
            </Form>
        </Container>
    )
}

export default LabelForm