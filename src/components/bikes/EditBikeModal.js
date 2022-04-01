import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import BikeForm from '../shared/BikeForm'

const EditBikeModal = (props) => {
    const { show, handleClose, updateBike, msgAlert, triggerRefresh } = props
    const [bike, setBike] = useState(props.bike)

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

            console.log('prevBike', prevBike)
            console.log('updatedValue', updatedValue)

            return {...prevBike, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the bike to submit', bike)
        updateBike(bike)
            .then(() => handleClose())
            .then(() =>
                msgAlert({
                    heading: 'Location Updated! Success!',
                    message: 'u did it',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: 'That\'s not right!',
                    variant: 'danger',
                }))
        console.log('this is the bike', bike)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <BikeForm 
                    bike={bike}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit location!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditBikeModal
