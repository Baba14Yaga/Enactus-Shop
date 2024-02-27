import axios from "axios"

const BASE_URL="http://localhost:5000/api/"

export const publicRequest= axios.create({
    baseURL:BASE_URL, 
})
export const userRequest=()=>{
    const TOKEN=JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.user)?.currentUser?.accessToken||false
    return(axios.create(({
        baseURL:BASE_URL,
        headers:{token:"Bearer "+TOKEN},
        }))
    )

} 

