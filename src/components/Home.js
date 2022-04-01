import IndexBikes from "./bikes/IndexBikes"

const Home = (props) => {
	const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<IndexBikes msgAlert={msgAlert} user={user}/>
		</>
	)
}

export default Home
