import React, {useContext, useEffect} from 'react';
import {
    Routes,
    Route, Navigate
} from "react-router-dom";

import {
    adminRoutes,
    authCommonRoutes,
    parentOrStudentRoutes,
    teacherRoutes,
    notAuthRoutes
} from "../routes";
import {ANNOUNCEMENT_PAGE_ROUTE, REGISTRATION_ROUTE} from "../utils/Const";
import {UserContext} from "../index";
import {$authHost} from "../http/Index";
import UserStore from "../store/UserStore";
import {RoleEnum} from "../store/RoleEnum";

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
            {user.isAuth &&
                user.role === RoleEnum.SchoolAdmin &&
                adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
            {user.isAuth &&
                user.role === RoleEnum.Teacher &&
                teacherRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
            {user.isAuth &&
                (user.role === RoleEnum.Parent || user.role === RoleEnum.Student) &&
                parentOrStudentRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} exact/>
                )}
            {user.isAuth && user.role === null && authCommonRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!user.isAuth && notAuthRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!user.isAuth ? <Route path="*" element={<Navigate to={REGISTRATION_ROUTE}/>}/> :
                <Route path="*" element={<Navigate to={ANNOUNCEMENT_PAGE_ROUTE}/>}/>
            }
        </Routes>
    );
};

export default AppRouter;