import { queryOptions, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { AddCartTypes, AllMyOrderCartTypes, AllOrderTypes, AllOrderTypesCompleted, AllProductsTypes, AllSingleMyOrderTypes, AllUserTypes, OrderTypes, ProductTypes } from "./AllTypes"

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
            return response.data as OrderTypes[]
        } catch (error) {
            console.log(error)

        }
    }
    return useQuery({
        queryKey: ["repair"],
        queryFn: getRepair,

    })
}

export const GetRepairAllUserById = ({ id }: { id: string }) => {
    const getRepair = async () => {
        try {
            const response = await axios.get(`${baseUrl}/upload_repair/${id}`)
            return response.data as OrderTypes
        } catch (error) {
            console.log(error)
        }
    }

    return useQuery({
        queryKey: ["repair", id],
        queryFn: getRepair,
        enabled: !!id
    })
}


export const GetRepairById = ({
    id,
    status,
    search
}:
    {
        id: string,
        status?: string,
        search?: string
    }) => {
    const getRepair = async () => {
        try {
            const response = await axios.get(`${baseUrl}/upload_repair_user`, {
                params: {
                    createdBy: id,
                    status,
                    search
                }
            })
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    return useQuery({
        queryKey: ["repair", id, status, search],
        queryFn: getRepair,
        enabled: !!id
    });
}


export const GetCartApi = () => {
    const getCart = async () => {
        try {
            const response = await axios.get(`${baseUrl}/cart`)
            return response.data as AddCartTypes[]
        } catch (error) {
            console.log(error)
        }
    }
    return useQuery({
        queryKey: ["cart"],
        queryFn: getCart
    })
}


export const GetMyOrderApi = ({ user_id }: { user_id: string }) => {
    const getMyOrder = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/`, {
                params: {
                    user_id: user_id
                }
            })
            return response.data as AllOrderTypesCompleted
        } catch (error) {
            console.log(error)
        }
    }
    return useQuery({
        queryKey: ["order", user_id],
        queryFn: getMyOrder,
        enabled: !!user_id
    })
}

export const GetALlShopOrderApi = () => {
    const getMyOrder = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/all_data`)
            return response.data as AllOrderTypesCompleted
        } catch (error) {
            console.log(error)
        }
    }
    return useQuery({
        queryKey: ["order",],
        queryFn: getMyOrder,
    })
}

export const GetSingleMyOrderApi = ({ id }: { id: string }) => {
    const getMyOrder = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/${id}`)
            return response.data as AllSingleMyOrderTypes
        } catch (error) {
            console.log(error)
        }
    }
    return useQuery({
        queryKey: ["order", id],
        queryFn: getMyOrder,
        enabled: !!id
    })
}

export const GetSaveAddressApi = ({ user_id }: { user_id: string }) => {
    const getMyOrder = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/address/${user_id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    return useQuery({
        queryKey: ["address"],
        queryFn: getMyOrder,
    })
}

export const GetSingleAddressByUser = ({ id }: { id: string }) => {
    const getMyOrder = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/address/single-address/${id}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
    return useQuery({
        queryKey: ["address"],
        queryFn: getMyOrder,
        enabled: !!id
    })
}