import React, { useState, useEffect } from 'react'
import { getAllBikes } from '../../api/bikes'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexBikesSuccess, indexBikesFailure} from '../shared/AutoDismissAlert/messages'

const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexBikes = (props) => {
    const [bikes, setBikes] = useState(null)
    const { msgAlert } = props

    useEffect(() => {
        getAllBikes()
            .then(res => {
                setBikes(res.data.bikes)
            })
            .then(() =>
                msgAlert({
                    heading: 'Here are all the City Bike locations!',
                    message: indexBikesSuccess,
                    variant: 'success',
            }))
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: indexBikesFailure,
                    variant: 'danger',
            }))
    }, [])

    if (!bikes) {
        return <p>loading...</p>
    } else if (bikes.length === 0) {
        return <p>no City Bike locations yet, please add some</p>
    }


    let bikeCards

    if (bikes.length > 0) {
        // bikesJsx = bikes.map(bike => (
        //     <li key={bike.id}>
        //         {bike.fullTitle}
        //     </li>
        // ))
        bikeCards = bikes.map(bike => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={bike.id} style={{ width: '30%' }} className="m-2" >
                <Card.Header>{bike.city}, {bike.state} {bike.country}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/citybikes/${bike.id}`}>{bike.company}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All the City Bike locations</h3>
            <div style={cardContainerLayout}>
                {bikeCards}
            </div>
        </>
    )
}

export default IndexBikes