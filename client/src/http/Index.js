import axios from "axios";

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL
})
const $adminHost = axios.create({
    baseURL: process.env.REACT_APP_API_ADMIN_URL
})
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost,
    $adminHost
}