import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../Store'

const PaymentDetails = () => {
    const { address } = useSelector((state: RootState) => state?.AddAddressCustomer);
    if (!address) {
        return (
            <>
                First use Address Go to AddressPage And check Icon
            </>
        )
    }
    return (
        <div>PaymentDetails</div>
    )
}

export default PaymentDetails