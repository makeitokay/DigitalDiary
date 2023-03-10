import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";


const App = observer(() => {

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
})

export default App