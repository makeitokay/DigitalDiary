import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {setSubject} from "../../../http/ItemAPI";
import {error, success} from "../../../components/Notifications";

const AddSubject = () => {
    const [nameOfSubject, setNameOfSubject] = useState("")
    function click(){
        if (nameOfSubject === ""){
            error("Заполните все поля.")
            return
        }
        setSubject(nameOfSubject).then(() => {
                success("Предмет добавлен.")
                setNameOfSubject("")
            }
        ).catch(_=>{
            error("Ошибка при добавлении предмета.")
        })
    }
    return (
        <div>
            <Form.Group className = "mb-3">
                <Form.Label>Введите название предмета</Form.Label>
                <Form.Control placeholder="введите название предмета" value={nameOfSubject} onChange={e => setNameOfSubject(e.target.value)}></Form.Control>
            </Form.Group>
            <Button onClick={click}>Добавить</Button>
        </div>
    );
};

export default AddSubject;