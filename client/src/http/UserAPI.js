import {$host} from "./Index";
import jwt_decode from "jwt-decode"
export const login = async (email,password) => {
    const {data} = await $host.post('auth/login', {email, password,role:"SchoolAdmin"});
    localStorage.setItem('accessToken', data.accessToken)
    return jwt_decode(data.accessToken)
}

function hasJWT() {
    let flag = false;
    localStorage.getItem("accessToken") ? flag=true : flag=false

    return flag
}