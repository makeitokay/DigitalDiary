import React, {useContext} from 'react';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";

import {authRoutes, NotAuthRoutes} from "../routes";
import {REGISTRATION_ROUTE} from "../utils/Const";
import {UserContext} from "../index";

const AppRouter = () => {
    const {user,setUser} = useContext(UserContext)
    console.log("appRouter")
    return (
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {!user.isAuth && NotAuthRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                <Route path="*" element={<Navigate to={REGISTRATION_ROUTE}/>}/>
            </Routes>
    );
};

export default AppRouter;