import { useNavigate } from 'react-router-dom'

import {Button, Container} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    // console.log('signout props', props)

    const navigate = useNavigate()

    const onSignOut = () => {
		signOut(user)
			.finally(() =>
				msgAlert({
					heading: 'Signed Out Successfully',
					message: messages.signOutSuccess,
					variant: 'success',
				})
			)
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }

    const onCancel = () => {
        navigate('/')
    }

	return (
        <>
            <div className='row'>
                <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <Container className='auth-container'>
                    <h1 className='fw-semibold text-center auth-header fs-4'>Are you sure you want to sign out?</h1>
                    <p id='sign-out-text' >*cries*</p>
                    <Container className='d-flex justify-content-evenly'>
                        <Button className='sign-out-buttons' onClick={onSignOut}>
                        Sign Out
                    </Button>
                    <Button className='sign-out-buttons' id='sign-out-cancel' onClick={onCancel}>
                        Cancel
                        </Button>
                    </Container>
                </Container>
                </div>
            </div>
        </>
	)
}

export default SignOut
