import { Box } from '@mui/material'
import React from 'react'
import { GetMyOrderApi } from '../AllGetApi'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'

const YourOrders = () => {
    const { user } = useSelector((state: RootState) => state.CustomerUser)
    const { data, isLoading, isError } = GetMyOrderApi({ user_id: user._id })

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%"
        }}>
            {
                data?.orders?.map((items: any) => (
                    <Box>
                        {items?.product_id?.product_name}
                    </Box>
                ))
            }
        </Box>
    )
}

export default YourOrders