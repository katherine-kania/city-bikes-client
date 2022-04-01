import apiUrl from '../apiConfig'
import axios from 'axios'

// index function
export const getAllBikes = () => {
    return axios(`${apiUrl}/citybikes`)
}