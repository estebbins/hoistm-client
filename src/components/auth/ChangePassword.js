import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const ChangePassword = (props) => {
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const navigate = useNavigate()

	const onChangePassword = (event) => {
		event.preventDefault()

		const { msgAlert, user } = props
        console.log('the user', user)
        

        const passwords = {oldPassword, newPassword}

		changePassword(passwords, user)
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
            <h1 className='fw-semibold text-center auth-header fs-1'>
				Change Password
                </h1>
                <Container className='auth-container'>
                    <Form onSubmit={onChangePassword} className='auth-form'>
                        <Form.Group controlId='oldPassword'>
                            <Form.Label>Old password</Form.Label>
                            <Form.Control
                                required
                                name='oldPassword'
                                value={oldPassword}
                                style={{color: 'white', opacity: '1'}}
                                className='auth-form-control'
                                type='password'
                                placeholder='Old Password'
                                onChange={e => setOldPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='newPassword'>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                required
                                name='newPassword'
                                value={newPassword}
                                className='auth-form-control mb-4'
                                type='password'
                                placeholder='New Password'
                                onChange={e => setNewPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Container className='d-flex justify-content-center'>
                            <Button variant='dark' type='submit' className='auth-submit'>
                                Submit
                            </Button>
                        </Container>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default ChangePassword