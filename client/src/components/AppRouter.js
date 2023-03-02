import React, {useContext} from 'react';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";

import {authRoutes, publicRoutes} from "../routes";
import {DIARY_PAGES_ROUTE} from "../utils/Const";
import {UserContext} from "../index";

const AppRouter = () => {
    const {user,setUser} = useContext(UserContext)
    console.log("appRouter")
    return (
            <Routes>
                {user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
                <Route path="*" element={<Navigate to={DIARY_PAGES_ROUTE}/>}/>
            </Routes>
    );
};

export default AppRouter;