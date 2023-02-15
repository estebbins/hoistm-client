import Container from 'react-bootstrap/Container'
import FilesIndex from './files/FilesIndex.js'
const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<Container className="m-2" style={{ textAlign: 'center' }}>
			<h2>Home Page</h2>
				<FilesIndex msgAlert={props.msgAlert} user={props.user} />
			</ Container>
		</>
	)
}

export default Home
