import React, {useState, useEffect} from 'react'
import { getOneBike, updateBike, removeBike } from '../../api/bikes'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import { showBikeSuccess, showBikeFailure } from '../shared/AutoDismissAlert/messages'
import EditBikeModal from './EditBikeModal'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowBike = (props) => {

    const [bike, setBike] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const {user, msgAlert} = props
    const { id } = useParams()
    const navigate = useNavigate()
    console.log('id in showBike', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneBike(id)
            .then(res => setBike(res.data.bike))
            .then(() => {
                msgAlert({
                    heading: 'Here is a location!',
                    message: showBikeSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No location found.',
                    message: showBikeFailure,
                    variant: 'danger',
                })
            })
    }, [updated])

    const removeTheBike = () => {
        removeBike(user, bike.id)
            .then(() => {
                msgAlert({
                    heading: 'Location removed!',
                    message: 'It doesn\'t exist anymore.',
                    variant: 'success',
                })
            })
            .then(() => {navigate(`/`)})
            .catch(() => {
                msgAlert({
                    heading: 'Something went wrong.',
                    message: 'This is not right.',
                    variant: 'danger',
                })
            })
    }


    if (!bike) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{bike.city}, {bike.state} {bike.country}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <small>Name: {bike.company}</small><br/>
                            <small>Number of stations: {bike.numStations}</small><br/>
                            <small>
                                Ebikes Available: {bike.ebikes ? 'yes' : 'no'}
                            </small>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit the location
                        </Button>
                        <Button onClick={() => removeTheBike()}className="m-2" variant="danger">
                            Delete the location
                        </Button>

                    </Card.Footer>
                </Card>
            </Container>
            <EditBikeModal 
                bike={bike}
                show={modalOpen}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                updateBike={updateBike}
                handleClose={() => setModalOpen(false)}
            />
        </>
    )
}

export default ShowBike