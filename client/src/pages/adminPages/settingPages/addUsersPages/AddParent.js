import React, {useState} from 'react';
import AddChild from "../../../../components/addUserComponents/AddChild";
import {setParent} from "../../../../http/ItemAPI";
import Button from "react-bootstrap/Button";
import {error, success} from "../../../../components/Notifications";
import Form from "react-bootstrap/Form";

const AddParent = ({firstName, lastName, email, change,allStudents}) => {
    const [children, setChildren] = useState([])

    function addChildren(arrayOfId) {
        setChildren(arrayOfId)
    }

    function click() {
        if (firstName === "" || lastName === "" || email === "" || children.length === 0) {
            error("Заполните все поля.")
            return
        }
        setParent(firstName, lastName, email, children).then(_ => {
            success("Родитель добавлен.")
            change()
        }).catch(_ => {
            error("Не удалось добавить родителя.")
        })
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Выберите детей</Form.Label>
                <AddChild array={allStudents} change={addChildren}/>
            </Form.Group>
            <Button onClick={click}>Добавить</Button>
        </div>
    );
};

export default AddParent;