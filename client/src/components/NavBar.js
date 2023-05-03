import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useContext} from "react";
import {observer} from "mobx-react-lite";
import {UserContext} from "../index";
import UserStore from "../store/UserStore";
import {NavLink, useNavigate} from "react-router-dom";
import {
    ANNOUNCEMENT_PAGE_ROUTE,
    DIARY_PAGE_ROUTE,
    JOURNAL_PAGE_ROUTE,
    REGISTRATION_ROUTE,
    REPORT_QUARTER_PAGE_ROUTE,
    SETTINGS_PAGE_ROUTE,
    STATISTIC_PAGE_ROUTE
} from "../utils/Const";
import {RoleEnum} from "../store/RoleEnum";
import "./NavBar.css"

const NavBar = observer(() => {
    console.log("Nav")
    const {user, setUser} = useContext(UserContext)
    console.log(user)
    const history = useNavigate()
    const logOut = () => {
        let us = new UserStore()
        us.setUser({});
        user.setIsAuth(false);
        setUser(us);
        localStorage.removeItem("accessToken");
        history(REGISTRATION_ROUTE)
    }

    function SchoolAdmin() {
        return (
            <Nav>
                <Nav.Link as={NavLink} to={ANNOUNCEMENT_PAGE_ROUTE}>Объявления</Nav.Link>
                <Nav.Link as={NavLink} to={JOURNAL_PAGE_ROUTE}>Журнал</Nav.Link>
                <Nav.Link as={NavLink} to={SETTINGS_PAGE_ROUTE}>Настройка школы</Nav.Link>
                <Nav.Link as={NavLink} to={STATISTIC_PAGE_ROUTE}>Статистика</Nav.Link>
            </Nav>
        );
    }

    function StudentOrParent() {
        return (
            <Nav>
                <Nav.Link as={NavLink} to={ANNOUNCEMENT_PAGE_ROUTE}>Объявления</Nav.Link>
                <Nav.Link as={NavLink} to={DIARY_PAGE_ROUTE}>Дневник</Nav.Link>
                <Nav.Link as={NavLink} to={REPORT_QUARTER_PAGE_ROUTE}>Четвертной отчет</Nav.Link>
            </Nav>
        );
    }

    function Teacher() {
        return (
            <Nav>
                <Nav.Link as={NavLink} to={ANNOUNCEMENT_PAGE_ROUTE}>Объявления</Nav.Link>
                <Nav.Link as={NavLink} to={JOURNAL_PAGE_ROUTE}>Журнал</Nav.Link>
            </Nav>
        );
    }

    function CheckRole() {
        switch (user.role) {
            case RoleEnum.Parent:
            case RoleEnum.Student:
                return <StudentOrParent/>
            case RoleEnum.Teacher:
                return <Teacher/>
            case RoleEnum.SchoolAdmin:
                return <SchoolAdmin/>
        }
    }

    return (
        <Navbar className="navbar navbar-custom">
            <Container fluid>
                <Navbar.Brand>Цифровой Дневник</Navbar.Brand>
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