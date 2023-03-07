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
    const {user, setUser} = useContext(UserContext)
    const history = useNavigate()
    const logOut = () => {
        let us = new UserStore()
        us.setUser({});
        user.setIsAuth(false);
        setUser(us);
        localStorage.removeItem("accessToken");
        history(REGISTRATION_ROUTE)
    }

    function AdminSchool() {
        return (
            <Nav>
                <Nav.Link href="#home">Объявления</Nav.Link>
                <Nav.Link href="#features">Журнал</Nav.Link>
                <Nav.Link href="#pricing">Изменение школы</Nav.Link>
                <Nav.Link href="#pricing">Статистика</Nav.Link>
            </Nav>
        );
    }

    function StudentOrParent() {
        return (
            <Nav>
                <Nav.Link href="#home">Объявления</Nav.Link>
                <Nav.Link href="#features">Дневник</Nav.Link>
                <Nav.Link href="#pricing">Четвертной отчет</Nav.Link>
            </Nav>
        );
    }

    function Teacher() {
        return (
            <Nav>
                <Nav.Link href="#home">Объявления</Nav.Link>
                <Nav.Link href="#features">Журнал</Nav.Link>
            </Nav>
        );
    }

    function CheckRole() {
        switch (user.role) {
            case "Parent":
            case "Student":
                return <StudentOrParent/>
            case "Teacher":
                return <Teacher/>
            case "SchoolAdmin":
                return <AdminSchool/>
        }
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home">ДНЕВНИК</Navbar.Brand>
                <Nav className="me-auto">
                    {
                        user.isAuth ?
                            <CheckRole/> :
                            <div/>
                    }
                </Nav>
                <Nav>
                    {
                        user.isAuth ?
                            <Nav.Link href="#exit" onClick={logOut}>Выход</Nav.Link> :
                            <Nav.Link href="#enter" onClick={() => history(REGISTRATION_ROUTE)}>Войти</Nav.Link>
                    }
                </Nav>
            </Container>
        </Navbar>
    );
})

export default NavBar;