import React, {useContext} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {observer} from "mobx-react-lite";
import {UserContext} from "./index";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
const App =  observer(() => {
    const {user,setUser} = useContext(UserContext)
    if ( localStorage.getItem("accessToken") ){
        user.setIsAuth(true)
        user.setUser(true)
    }
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App