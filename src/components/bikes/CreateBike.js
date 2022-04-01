import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createBike } from '../../api/bikes'
import {createBikeSuccess, createBikeFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import BikeForm from '../shared/BikeForm'

const CreateBike = (props) => {
    const {msgAlert} = props
    const navigate = useNavigate()
    const [bike, setBike] = useState({city: '', state: '', country: '', company: '', numStations: '', ebikes: false})
    console.log('bike in create', bike)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setBike(prevBike => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if(name === "ebikes" && e.target.checked){
                value = true
            } else if (name === "ebikes" && !e.target.checked){
                value = false
            }

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            return {...prevBike, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        createBike(bike)
            .then(res => {navigate(`/citybike/${res.data.bike.id}`)})
            .then(() =>
                msgAlert({
                    heading: 'Location Added! Success!',
                    message: createBikeSuccess,
                    variant: 'success',
                }))
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createBikeFailure,
                    variant: 'danger',
                }))
    }

    return (
        <BikeForm 
            bike={bike}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new location!"
        />
    )
}

export default CreateBike