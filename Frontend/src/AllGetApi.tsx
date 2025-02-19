import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { AllProductsTypes, AllUserTypes, ProductTypes } from "./AllTypes"

export const getUsers = ({
    search,
    filter,
}: {
    search: string,
    filter: string
}) => {
    const getJokesApi = async () => {
        try {

            const response = await axios.get(`${baseUrl}/users`, {
                params: {
                    search,
                    filter
                }
            })
            return response.data as AllUserTypes
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["jokes", search, filter],
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


export const GetProductApi = ({
    search,
}: {
    search: string
}) => {
    const getProduct = async () => {
        try {

            const response = await axios.get(`${baseUrl}/products`, {
                params: {
                    search
                }
            })
            return response.data as AllProductsTypes
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["products", search],
        queryFn: getProduct,

    })
}


export const GetProductById = ({ id }: { id: string }) => {
    const getProduct = async () => {
        try {

            const response = await axios.get(`${baseUrl}/product/${id}`)
            return response.data as ProductTypes
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["products", id],
        queryFn: getProduct,
        enabled: !!id
    })
}