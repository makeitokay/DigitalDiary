import React, {useContext} from 'react';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";

import {authRoutes, NotAuthRoutes} from "../routes";
import {MAIN_PAGES_ROUTE} from "../utils/Const";
import {UserContext} from "../index";

const AppRouter = () => {
    const {user, setUser} = useContext(UserContext)
    console.log("appRouter")
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!user.isAuth && NotAuthRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path="*" element={<Navigate to={MAIN_PAGES_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;