import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {error, success} from "../../components/Notifications";
import {createSchool} from "../../http/ItemAPI";
import {ToastContainer} from "react-toastify";
import {Card, Container} from "react-bootstrap";

const CreateSchoolPage = () => {
    const [schoolName, setSchoolName] = useState("")
    const [schoolCity, setSchoolCity] = useState("")
    const [creatorEmail, setCreatorEmail] = useState("")
    const [creatorFirstName, setCreatorFirstName] = useState("")
    const [creatorLastName, setCreatorLastName] = useState("")

    function addSchool() {
        if (schoolName === "" || schoolCity === "" ||
            creatorEmail === "" || creatorFirstName === "" ||
            creatorLastName === "") {
            error("Заполните все поля")
        } else {
            createSchool(schoolName, schoolCity, creatorEmail, creatorFirstName, creatorLastName).then(() => {
                success("Заявка на создание школы отправлена")
            }).catch((e) => {
                error("Не удалось отправить заявку")
            })
        }
    }

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight - 54}}>
                <Card style={{width: 600}} className={"p-5"}>
                    <Form>
                        <Form.Group className="mb-3" controlId="schoolName">
                            <Form.Label>Название школы</Form.Label>
                            <Form.Control placeholder="Введите название школы" value={schoolName}
                                          onChange={e => setSchoolName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="schoolCity">
                            <Form.Label>Название города</Form.Label>
                            <Form.Control placeholder="Введите название города" value={schoolCity}
                                          onChange={e => setSchoolCity(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="creatorEmail">
                            <Form.Label>Почта создателя школы</Form.Label>
                            <Form.Control type="email" placeholder="Введите почту создателя школы" value={creatorEmail}
                                          onChange={e => setCreatorEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="creatorFirstName">
                            <Form.Label>Имя создателя</Form.Label>
                            <Form.Control placeholder="Введите имя создателя" value={creatorFirstName}
                                          onChange={e => setCreatorFirstName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="creatorLastName">
                            <Form.Label>Фамилия создателя</Form.Label>
                            <Form.Control placeholder="Введите фамилию создателя" value={creatorLastName}
                                          onChange={e => setCreatorLastName(e.target.value)}/>
                        </Form.Group>

                        <Button variant="primary" onClick={addSchool}>
                            добавить
                        </Button>
                    </Form>
                </Card>
            </Container>
            <ToastContainer/>
        </div>
    );
};

export default CreateSchoolPage;