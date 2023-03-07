import React, {useContext, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {observer} from "mobx-react-lite";
import {UserContext} from "./index";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import {$authHost} from "./http/Index";
import UserStore from "./store/UserStore";

const App = observer(() => {
    const {user, setUser} = useContext(UserContext)
    let us = new UserStore()
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            $authHost.get('users/me').then(data => {
                    us.setUser(data.data)
                    us.setRole(data.data.role)
                    us.setIsAuth(true)
                    setUser(us)
                }
            )
        }
    }, [])
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App