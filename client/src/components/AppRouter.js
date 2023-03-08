import React, {useContext, useEffect} from 'react';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";

import {authRoutes, NotAuthRoutes} from "../routes";
import {MAIN_PAGES_ROUTE, REGISTRATION_ROUTE} from "../utils/Const";
import {UserContext} from "../index";
import {$authHost} from "../http/Index";
import UserStore from "../store/UserStore";

const AppRouter = () => {
    const {user, setUser} = useContext(UserContext)
    if (localStorage.getItem("accessToken")) {
        user.setIsAuth(true)
    }
    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            $authHost.get('users/me').then(data => {
                    console.log("local")
                    let us = new UserStore()
                    us.setUser(data.data)
                    us.setIsAuth(true)
                    us.setRole(data.data.role)
                    setUser(us)
                }
            )
        }
    }, [])
    console.log("appRouter")
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!user.isAuth && NotAuthRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!user.isAuth ? <Route path="*" element={<Navigate to={REGISTRATION_ROUTE}/>}/> :
                <Route path="*" element={<Navigate to={MAIN_PAGES_ROUTE}/>}/>
            }
        </Routes>
    );
};

export default AppRouter;