import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const postUser = () => {
    const queryClient = useQueryClient()
    const postJokesApi = async ({ data }: any) => {
        try {

            const response = await axios.post(`${baseUrl}/user/add`, data)
            return response
        } catch (error) {
            console.log(error)

        }
    }
    return useMutation({
        mutationFn: postJokesApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jokes"] })
        }
    })

}

export const DeleteUser = () => {
    const queryClient = useQueryClient()
    const deleteUserApi = async ({ id }: any) => {
        try {

            const response = await axios.delete(`${baseUrl}/user/delete/${id}`)
            return response
        } catch (error) {
            console.log(error)

        }
    }
    return useMutation({
        mutationFn: deleteUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jokes"] })
        }
    })
}

export const UpdateUserApi = () => {
    const queryClient = useQueryClient()
    const updateUserApi = async ({ id, data }: any) => {
        try {

            const response = await axios.patch(`${baseUrl}/user/update/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jokes"] })
        }
    })
}

export const AddProductItems = () => {
    const queryClient = useQueryClient()
    const AddProductItems = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/items/add`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: AddProductItems,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}



export const DeleteTodo = () => {
    const queryClient = useQueryClient()
    const deleteUserApi = async ({ id }: any) => {
        try {

            const response = await axios.delete(`${baseUrl}/items/delete/${id}`)
            return response
        } catch (error) {
            console.log(error)

        }
    }
    return useMutation({
        mutationFn: deleteUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}


export const loginVerify = () => {
    const queryClient = useQueryClient()
    const loginVerifyApi = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            return response
        } catch (error) {

        }
    }
    return useMutation({
        mutationFn: loginVerifyApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jokes"] })
        }
    })
}

export const updateProductPostApi = () => {
    const queryClient = useQueryClient()
    const updateProductPostApi = async ({ id, data }: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/items/update/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return useMutation({
        mutationFn: updateProductPostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}


export const UploadRepairDetails = () => {
    const queryClient = useQueryClient()
    const UploadREpairDetails = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/upload_repair`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return useMutation({
        mutationFn: UploadREpairDetails,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["repair"] })
        }
    })
}

export const UploadRepairStatus = () => {
    const queryClient = useQueryClient()
    const UploadREpairStatus = async ({ id, data }: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/upload_repair_status/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return useMutation({
        mutationFn: UploadREpairStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["repair"] })
        }
    })
}

export const DeleteRepair = () => {
    const queryClient = useQueryClient()
    const DeleteRepair = async ({ id }: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/upload_repair/${id}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return useMutation({
        mutationFn: DeleteRepair,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["repair"] })
        }
    })
}


export const AddToCart = () => {
    const queryClient = useQueryClient()
    const AddToCart = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/cart/add`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: AddToCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    })
}

export const UpdateCartApi = () => {
    const queryClient = useQueryClient()
    const updateCartApi = async ({ id, data }: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/cart/update/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: updateCartApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        },

    })
}

export const DeleteCart = () => {
    const queryClient = useQueryClient()
    const DeleteCart = async ({ id }: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/cart/delete/${id}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: DeleteCart,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    })
}

export const OrderCreateApi = () => {
    const queryClient = useQueryClient()
    const orderCreateApi = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/order/create`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: orderCreateApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] })
        }
    })
}