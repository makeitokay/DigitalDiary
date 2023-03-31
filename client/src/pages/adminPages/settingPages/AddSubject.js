import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {setSubject} from "../../../http/ItemAPI";
import {error, success} from "../../../components/Notifications";

const AddSubject = () => {
    const [subjectName, setSubjectName] = useState("")

    function click() {
        if (subjectName === "") {
            error("Заполните все поля.")
            return
        }
        setSubject(subjectName).then(() => {
                success("Предмет добавлен.")
                setSubjectName("")
            }
        ).catch(_ => {
            error("Ошибка при добавлении предмета.")
        })
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Введите название предмета</Form.Label>
                <Form.Control placeholder="введите название предмета" value={subjectName}
                              onChange={e => setSubjectName(e.target.value)}></Form.Control>
            </Form.Group>
            <Button onClick={click}>Добавить</Button>
        </div>
    );
};

export default AddSubject;