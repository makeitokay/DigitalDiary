
import {makeAutoObservable} from 'mobx'
import {RoleEnum} from "./RoleEnum";
export default class UserStore{
    constructor() {
        this._isAuth = false
        this._user ={}
        this._role = RoleEnum.default
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }
    setRole(roleUser){
        Object.keys(RoleEnum).forEach(
            role => {
                if(role === roleUser){
                    this._role = role
                }
            }
        )
    }

    setUser(user){
        this._user = user
    }

    get isAuth(){
        return this._isAuth
    }
    get role(){
        return this._role
    }
    get user(){
        return this._user
    }
}