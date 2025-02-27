import React from 'react'
import BatsDetails from './ShopBats/BatsDetails'
import EditModalUser from './User/EditModalUser'
import EditProductDetails from './ShopBats/EditProductDetails'
import EditModalRepairByAdmin from './Repair/EditModalRepairByAdmin'
import ChangeShopStatus from './ShopsOrder.tsx/ChangeShopStatus'

const AllModalList = () => {
    return (
        <>
            <EditModalUser />
            <EditProductDetails />
            <EditModalRepairByAdmin />
            <ChangeShopStatus />
        </>
    )
}

export default AllModalList