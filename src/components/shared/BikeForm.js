import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const BikeForm = ({ bike, handleSubmit, handleChange }) => (
    <Container className="justify-content-center">
        <Form onSubmit={handleSubmit}>
            <Form.Label>City</Form.Label>
            <Form.Control 
                placeholder="what is the city name?"
                value={bike.city}
                name='city'
                onChange={handleChange}
            />
            <Form.Label>State</Form.Label>
            <Form.Control 
                placeholder="If it's in the US, what state?"
                value={bike.state}
                name='state'
                onChange={handleChange}
            />
            <Form.Label>Country</Form.Label>
            <Form.Control 
                placeholder="what is the country?"
                value={bike.country}
                name='country'
                onChange={handleChange}
            />
            <Form.Label>Company</Form.Label>
            <Form.Control 
                placeholder="what are the bikes called?"
                value={bike.company}
                name='company'
                onChange={handleChange}
            />
            <Form.Control 
                placeholder="How many stations are there?"
                value={bike.numStations}
                type='Number'
                name='numStations'
                onChange={handleChange}
            />
            <Form.Check 
                label='Does the location have ebikes?'
                name='ebikes'
                defaultChecked={bike.ebikes}
                onChange={handleChange}
            />
            <Button type='submit'>Submit</Button>
        </Form>
    </Container>
)

export default BikeForm