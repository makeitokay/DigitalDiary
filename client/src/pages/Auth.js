import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Card, Container} from "react-bootstrap";
import {login} from "../http/UserAPI";
import {useContext, useState} from "react";
import {observer} from "mobx-react-lite"
import {useNavigate} from "react-router-dom";
import {MAIN_PAGES_ROUTE} from "../utils/Const";
import {UserContext} from "../index";
import UserStore from "../store/UserStore";


const Auth = observer(() => {
    const {user,setUser} = useContext(UserContext)
    const history = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () =>{
        try {
            let data
            data = await login(email,password);
            let us = new UserStore()
            us.setUser(data);
            us.setIsAuth(true)
            setUser(us)
            console.log("auth")
            history(MAIN_PAGES_ROUTE)
        } catch (e){
            alert(e.response.data.message)
        }
    }
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight -54}}
        >
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
                    <Button onClick={click}>
                        Войти
                    </Button>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;