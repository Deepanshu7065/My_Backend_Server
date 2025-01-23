import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const postJokes = () => {
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

export const UpdateUser = () => {
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

export const UpdateTodo = () => {
    const queryClient = useQueryClient()
    const updateUserApi = async ({ id, data }: any) => {
        try {

            const response = await axios.post(`${baseUrl}/todo/add`, data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
    return useMutation({
        mutationFn: updateUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jokestodo"] })
        }
    })
}



export const DeleteTodo = () => {
    const queryClient = useQueryClient()
    const deleteUserApi = async ({ id }: any) => {
        try {

            const response = await axios.delete(`${baseUrl}/todo/delete/${id}`)
            return response
        } catch (error) {
            console.log(error)

        }
    }
    return useMutation({
        mutationFn: deleteUserApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jokestodo"] })
        }
    })
}