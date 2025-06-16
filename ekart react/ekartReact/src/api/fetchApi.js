import commonApi from "./commonApi";

export const getAllProducts=()=>{
    return commonApi(`http://127.0.0.1:8004/product/`, 'GET', '', '')
}

export const getProduct=(id)=>{
    return commonApi(`http://127.0.0.1:8004/product/${id}/`, 'GET', '', '')
}

export const userRegister=(data)=>{
    return commonApi(`http://127.0.0.1:8004/user/`, 'POST', data, '')
}

export const userLogin=(data)=>{
    return commonApi(`http://127.0.0.1:8004/token`, 'POST', data, '')
}

export const userId=()=>{
    return commonApi(`http://127.0.0.1:8004/token`, 'GET', '', '')
}

export const addToCart=(id, data, header)=>{
    return commonApi(`http://127.0.0.1:8004/product/${id}/add_to_cart/`, 'POST', data, header)
}

// export const cartItmems=(id, header)=>{
//     return commonApi(`http://127.0.0.1:8004/user/${id}/list_cart_user/`, 'GET', '', header)
// }

export const listCart=(id, header)=>{
    return commonApi(`http://127.0.0.1:8004/user/${id}/list_cart_user/`, 'GET', '', header)
}

export const cartUserId =(header)=>{
    return commonApi(`http://127.0.0.1:8004/user/detail/`, 'GET', '', header)
}


export const orderPlaced=(id, data, header)=>{
    return commonApi(`http://127.0.0.1:8004/cart/${id}/order_placed/`, 'POST', data, header)
}

export const addReviews=(id, data, header)=>{
    return commonApi(`http://127.0.0.1:8004/product/${id}/add_reviews/`, 'POST', data, header)
}