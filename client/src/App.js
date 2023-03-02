import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {UserContext} from "./index";

const App = observer(() => {
    const {user,setUser} = useContext(UserContext)
    const [loading, setLoading] = useState(true)
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

export default App;
