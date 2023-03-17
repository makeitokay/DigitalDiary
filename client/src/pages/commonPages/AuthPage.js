import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card, Container, DropdownButton} from "react-bootstrap";
import {login} from "../../http/UserAPI";
import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";
import {ANNOUNCEMENT_PAGE_ROUTE} from "../../utils/Const";
import {UserContext} from "../../index";
import UserStore from "../../store/UserStore";
import Dropdown from "react-bootstrap/Dropdown";
import {ToastContainer} from "react-toastify"
import {notify} from "../../components/Notifications";


const AuthPage = observer(() => {
    const {_, setUser} = useContext(UserContext)
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Выберите роль')
    const [roleForApi, setRoleForApi] = useState('')
    const click = async () => {
        if (password === "") {
            notify("Пароль не введен")
            return
        } else if (email === "") {
            notify("Введите почту")
            return
        } else if (roleForApi === "") {
            notify("Выберите роль")
            return
        }
        try {
            let data
            data = await login(email, password, roleForApi);
            let us = new UserStore()
            us.setUser(data)
            us.setIsAuth(true)
            us.setRole(roleForApi)
            setUser(us)
            console.log("auth")
            history(ANNOUNCEMENT_PAGE_ROUTE)
        } catch (e) {
            if (e.response.status === 401) {
                notify(e.response.data)
            }
        }
    }
    const roleClick = async (name) => {
        switch (name) {
            case "Студент":
                setRole(name)
                setRoleForApi("Student")
                break;
            case "Учитель":
                setRole(name)
                setRoleForApi("Teacher")
                break;
            case "Родитель":
                setRole(name)
                setRoleForApi("Parent")
                break;
            case "Администратор школы":
                setRole(name)
                setRoleForApi("SchoolAdmin")
                break;
        }
    }
    console.log("dddd")
    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}>
                <Card style={{width: 600}} className={"p-5"}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Почта</Form.Label>
                            <Form.Control type="email" placeholder="Введите почту"
                                          value={email}
                                          onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль"
                                          value={password}
                                          onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <DropdownButton className="mb-3" id="dropdown-basic-button" title={role} drop="end"
                                        variant="firstly" onChange={roleClick}>
                            {['Студент', 'Учитель', 'Родитель', 'Администратор школы'].map(
                                (roleUser) =>
                                    <Dropdown.Item key={roleUser}
                                                   onClick={_ => roleClick(roleUser)}>{roleUser}</Dropdown.Item>
                            )}
                        </DropdownButton>
                        <Button onClick={click}>
                            Войти
                        </Button>
                    </Form>
                </Card>
            </Container>
            <ToastContainer/>
        </div>
    );
})

export default AuthPage;