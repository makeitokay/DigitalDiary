import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {UserContext} from "../index";
import UserStore from "../store/UserStore";
import {useNavigate} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../utils/Const";

const NavBar = observer(() => {
    const {user,setUser} = useContext(UserContext)
    const history = useNavigate()
    const logOut = () => {
        let us = new UserStore()
        us.setUser({});
        user.setIsAuth(false);
        setUser(us);
        localStorage.removeItem("accessToken");
        history(REGISTRATION_ROUTE)
    }
    return (
            <Navbar bg="primary" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        {user.isAuth ?  <Nav.Link href="#pricing" onClick={logOut}>Выход</Nav.Link> :
                            <Nav.Link href="#pricing" onClick={()=>history(REGISTRATION_ROUTE)}>Войти</Nav.Link>
                        }
                    </Nav>
                </Container>
            </Navbar>
    );
})

export default NavBar;