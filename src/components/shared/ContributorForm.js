import { Form, Button, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { getFilteredUsers } from '../../api/contributors'
import messages from '../shared/AutoDismissAlert/messages'

const ContributorForm = (props) => {
    const { user, filterValue, handleChange, handleSubmit, handleChoice, heading, triggerRefresh, msgAlert } = props
    const [userList, setUserList] = useState([])
    const [error, setError] = useState(false)
    const [contributor, setContributor] = useState(props.contributor)

    console.log('cont form contributor', contributor)

    useEffect(() => {
        // console.log('useeffect filterValue', filterValue)
        // If there is a filterValue, then get a list of users that matches that filter value
        if (filterValue) {
            getFilteredUsers(user, filterValue)
                .then(res => {setUserList(res.data.users)})
                .then(() => triggerRefresh())
                .catch(err => {
                    msgAlert({
                        heading: 'Error!',
                        message: messages.getUserFailure,
                        variant: 'danger'
                    })
                    setError(true)
                })
        }
    }, [filterValue])

    useEffect(() => {
        console.log('useeffect', contributor)
        // setContributor(contributor)
    }, [contributor])

    const filteredUsers = userList.map((user, i) => (
        <option value={user._id} key={i}>{user.email}</option>
    ))

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Search for user by e-mail</Form.Label>
                    <Form.Control 
                        placeholder="What is the contributor's e-mail"
                        name="filterValue"
                        id="filterValue"
                        defaultValue={filterValue}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Select user or continue typing in search bar to narrow results</Form.Label>
                    { props.contributor ? 
                        <Form.Select 
                            className='auth-form-control'
                            aria-label="email"
                            name="userRef"
                            defaultValue={props.contributor.email}
                            onChange={handleChoice}
                        >
                            <option>Open this select menu</option>
                            { filteredUsers }
                        </Form.Select>
                        :
                        <Form.Select
                            className='auth-form-control'
                            aria-label="email"
                            name="userRef"
                            onChange={handleChoice}
                        >
                            <option>Open this select menu</option>
                            { filteredUsers }
                        </Form.Select>
                    }
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        className='auth-form-control'
                        aria-label="permission level"
                        name="permissionLevel"
                        defaultValue={props.contributor.permissionLevel}
                        onChange={handleChoice}
                    >
                        <option>Open this select menu</option>
                        <option value="read only">read only</option>
                        <option value="read and write">read and write</option>
                    </Form.Select>
                </Form.Group>
                <Container className='d-flex justify-content-end p-0'>
                    <Button className='m-2' id='contributor-add-submit' type="submit">Submit</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default ContributorForm