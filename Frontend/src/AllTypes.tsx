// {
//     "_id": "67aedcfdc1ccbd412dd3b5f1",
//     "product_name": "bat",
//     "description": "328",
//     "createdBy": {
//         "_id": "67a9cc3b1d67dd79300da0a3",
//         "username": "sdaf",
//         "email": "deepanshu.10@gmail.com",
//         "password": "$2b$10$RxpDp5SOg30M/3a8/wmEDeht9yggZZ5pLdfKV4wRnUrpm9dPRs5oW",
//         "createdAt": "2025-02-10T09:51:55.055Z",
//         "updatedAt": "2025-02-10T09:51:55.055Z",
//         "__v": 0
//     },
//     "price": 893,
//     "quantity": 90,
//     "image": "/uploads/1739513085987-images_7.jpeg",
//     "fileName": "1739513085987-images_7.jpeg",
//     "path": "/uploads/1739513085987-images_7.jpeg",
//     "createdAt": "2025-02-14T06:04:45.996Z",
//     "updatedAt": "2025-02-14T06:04:45.996Z",
//     "__v": 0
// }

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

export interface AllMyOrderCartTypes {
    message: string
    order: SingleOrderTypes
}

export interface SingleOrderTypes {
    _id?: string
    product_id?: ProductTypes[]
    quantity?: number
    total?: number
    user?: UserType
    status?: string
    orderId?: string
    phone?: number
    address?: string
    fullAddress?: string
    landmark?: string
    state?: string
    city?: string
    pincode?: number
    customer_name?: string
    createdAt?: string
    updatedAt?: string
    __v?: number
    reason?: string
}