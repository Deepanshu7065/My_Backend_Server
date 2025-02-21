import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { AllProductsTypes, AllUserTypes, ProductTypes } from "./AllTypes"

export const getUsers = ({
    search,
    filter,
    page,
    limit
}: {
    search: string,
    filter: string,
    page?: number,
    limit?: number
}) => {
    const getJokesApi = async () => {
        try {

            const response = await axios.get(`${baseUrl}/users`, {
                params: {
                    search,
                    filter,
                    page,
                    limit
                }
            })
            return response.data as AllUserTypes
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["jokes", search, filter, page, limit],
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
    page,
    limit
}: {
    search: string;
    page?: number;
    limit?: number
}) => {
    const getProduct = async () => {
        try {

            const response = await axios.get(`${baseUrl}/products`, {
                params: {
                    search,
                    page,
                    limit
                }
            })
            return response.data as AllProductsTypes
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["products", search, page, limit],
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

export const GetRepairAllApi = () => {
    const getRepair = async () => {
        try {
            const response = await axios.get(`${baseUrl}/upload_repair`)
            return response.data
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["repair"],
        queryFn: getRepair,

    })
}