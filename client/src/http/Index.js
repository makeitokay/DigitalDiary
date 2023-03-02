import axios from "axios";

const $authHost = axios.create({
    baseURL: 'http://localhost:5189'
})
const $host = axios.create({
    baseURL: 'http://localhost:5189'
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}