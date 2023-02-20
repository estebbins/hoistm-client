import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const SignIn = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

	const onSignIn = (event) => {
		event.preventDefault()
        // console.log('the props', props)
		const { msgAlert, setUser } = props

        const credentials = {email, password}

		signIn(credentials)
			.then((res) => setUser(res.data.user))
			.then(() =>
				msgAlert({
					heading: 'Sign In Success',
					message: messages.signInSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                {/* <h3>Sign In</h3> */}
                <h1 className='fw-semibold text-center auth-header'>
				Sign In
                </h1>
                <Container className='auth-container'>
                    <Form onSubmit={onSignIn} className='auth-form'>
                        <Form.Group controlId='email'>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type='email'
                                name='email'
                                className='auth-form-control'
                                value={email}
                                placeholder='Enter email'
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId='password' className='pt-2'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                name='password'
                                value={password}
                                type='password'
                                placeholder='Password'
                                className='mb-4 auth-form-control'
                                onChange={e => setPassword(e.target.value)}
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

export default SignIn
