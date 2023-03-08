import 'bootstrap/dist/css/bootstrap.css';
import React, {createContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";


export const UserContext = createContext(null)

function Root() {
    const [user, setUser] = useState(new UserStore());
    return (
        <UserContext.Provider value={{user, setUser}}>
            <App/>
        </UserContext.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root/>);