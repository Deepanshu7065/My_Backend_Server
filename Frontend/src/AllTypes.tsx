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
export interface ProductTypes {
    _id?: string
    product_name?: string
    description?: string
    createdBy?: {
        _id?: string
        username?: string
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
    __v: number
}