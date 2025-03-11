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
    const DeleteCart = async ({ id, user }: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/cart/delete/${id}?user=${user}`)
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

export const ChangeShopsOrderStatus = () => {
    const queryClient = useQueryClient()
    const ChangeShopsOrderStatus = async ({ id, data }: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/order/update_status/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }

    return useMutation({
        mutationFn: ChangeShopsOrderStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] })
        }
    })
}

export const AddAddressApi = () => {
    const queryClient = useQueryClient()
    const addAddressApi = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/order/add-address`, data)
            console.log(data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: addAddressApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
        }
    })
}


export const UpdateAddressApi = () => {
    const queryClient = useQueryClient()
    const updateAddressApi = async ({ id, data }: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/order/update-address/${id}`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: updateAddressApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
        }
    })
}

export const DeleteAddressApi = () => {
    const queryClient = useQueryClient()
    const deleteAddressApi = async ({ id }: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/order/delete-address/${id}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: deleteAddressApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["address"] })
        }
    })
}


export const DeleteMyOrder = () => {
    const queryClient = useQueryClient()
    const deleteMyOrder = async ({ id }: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/order/delete/${id}`)
            return response
        } catch (error) {
            console.log(error)
        }

    }
    return useMutation({
        mutationFn: deleteMyOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["order"] })
        }
    })
}


export const DeleteAllCartByUSer = () => {
    const queryClient = useQueryClient()
    const deleteAllCartByUSer = async ({ user }: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/cart/delete-all?user=${user}`)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: deleteAllCartByUSer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    })
}

export const ContactDetailsPostApi = () => {
    const queryClient = useQueryClient()
    const contactDetailsPostApi = async ({ data }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/contact/add`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: contactDetailsPostApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact"] })
        }
    })
}


export const ContactSendMessage = () => {
    const queryClient = useQueryClient()
    const contactSendMessage = async ({ data, }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/contact/send`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: contactSendMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact"] })
        }
    })
}

export const ContactReplMessage = () => {
    const queryClient = useQueryClient()
    const contactReplMessage = async ({ data, }: any) => {
        try {
            const response = await axios.post(`${baseUrl}/contact/reply`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: contactReplMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact"] })
        }
    })
}


export const TicketStatusChange = () => {
    const queryClient = useQueryClient()
    const ticketStatusChange = async ({ status, id }: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/contact/update/${id}`, {
                status: status  
            })
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: ticketStatusChange,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["contact"] })
        }
    })
}
