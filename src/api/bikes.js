import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllBikes = () => {
    return axios(`${apiUrl}/citybikes`)
}

// show function
export const getOneBike = (bikeId) => {
    return axios(`${apiUrl}/citybikes/${bikeId}`)
}

// POST -> create function
export const createBike = (newBike) => {
    console.log('this is newPet', newBike)
    return axios({
        url: `${apiUrl}/bikes`,
        method: 'POST',
        data: { bike: newBike }
    })
}

// PATCH -> update function
export const updateBike = (updatedBike) => {
    console.log('this is newBike', updatedBike)
    return axios({
        url: `${apiUrl}/citybikes/${updatedBike.id}`,
        method: 'PATCH',
        data: { bike: updatedBike }
    })
}

// DELETE -> remove function
export const removeBike = (bikeId) => {
    return axios({
        url: `${apiUrl}/citybikes/${bikeId}`,
        method: 'DELETE'
    })
}