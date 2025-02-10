import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { baseUrl } from "./ApiEndPoint"

export const getJokes = () => {
    const getJokesApi = async () => {
        try {

            const response = await axios.get(`${baseUrl}/users`)
            return response
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["jokes",],
        queryFn: getJokesApi
    })
}


export const getSingleUser = ({ id }: { id: string }) => {
    const getSingleUserApi = async () => {
        try {

            const response = await axios.get(`${baseUrl}/user/${id}`)
            return response.data
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["jokes", id],
        queryFn: getSingleUserApi,
        enabled: !!id
    })
}


export const GetProductApi = () => {
    const getProduct = async () => {
        try {

            const response = await axios.get(`${baseUrl}/items/`)
            return response.data
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["products",],
        queryFn: getProduct,

    })
}


