import {$host} from "./Index";
import jwt_decode from "jwt-decode"

export const login = async (email, password, role) => {
    const {data} = await $host.post('auth/login', {email, password, role});
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
}