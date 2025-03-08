

export interface AllProductsTypes {
    products: ProductTypes[]
    totalProduct: number
}
export interface ProductTypes {
    _id?: string
    product_name?: string
    description?: string
    createdBy?: {
        _id?: string
        userName?: string
        email?: string
        password?: string
        createdAt?: string
        updatedAt?: string
        __v?: number
    }
    price?: number
    quantity?: number
    image?: string
    fileName?: string
    path?: string
    createdAt?: string
    updatedAt?: string
    __v: number;
    brand?: string
    size?: string
    more_details?: string
    weight?: number
}

export interface AllUserTypes {
    users: UserType[]
    totalUser: number
}
export interface UserType {
    _id?: string
    userName?: string
    email?: string
    phone?: number
    userType?: string
    token?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export interface AllOrderTypes {
    orders: OrderTypes[]
    totalOrder: number
    message?: string
}


export interface OrderTypes {
    _id?: string
    product_name?: string
    details?: string
    createdBy?: {
        _id?: string
        userName?: string
        email?: string
    }
    phone?: number
    address?: string
    fullAddress?: string
    landmark?: string
    state?: string
    city?: string
    pincode?: number
    images: string[]
    status?: string
    orderId?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
    amount?: number
    reason?: string
}


export interface AddCartTypes {
    _id?: string
    product_id?: ProductTypes
    price?: number
    quantity?: number
    createdAt?: string
    updatedAt?: string
    __v?: number
}

export interface AllOrderTypesCompleted {
    orders: AllMyOrderCartTypes[]
    message: string
}

export interface AllSingleMyOrderTypes {
    order: AllMyOrderCartTypes
    message : string
}
export interface AllMyOrderCartTypes {
    _id: string
    product_id: ProductId[]
    quantity: number
    total: number
    user: User
    status: string
    orderId: string
    address: Address
    deleveryCharge: number
    discount: number
    createdAt: string
    updatedAt: string
    __v: number
    reason?: string
}

export interface ProductId {
    _id: string
    product_name: string
    description: string
    createdBy: string
    price: number
    quantity: number
    image: string
    fileName: string
    path: string
    brand: string
    size: string
    more_details: string
    weight: number
    createdAt: string
    updatedAt: string
    __v: number
}

export interface User {
    _id: string
    userName: string
    email: string
}

export interface Address {
    _id: string
    customer_name: string
    user: string
    last_name: string
    phone: number
    address: string
    fullAddress: string
    pincode: number
    landmark: string
    city: string
    state: string
    country: string
    __v: number
}
