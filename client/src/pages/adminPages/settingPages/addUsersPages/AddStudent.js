import React, {useState} from 'react';
import {setStudent} from "../../../../http/ItemAPI";
import {error, success} from "../../../../components/Notifications";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import Form from "react-bootstrap/Form";

const AddStudent = ({firstName, lastName, email, change, allGroups ,getGroups}) => {
    const [group, setGroup] = useState("")

    function changeGroup(e) {
        setGroup(e.label)
    }

    function click() {
        if (firstName === "" || lastName === "" || email === "" || group === "") {
            error("Заполните все поля.")
            return
        }
        let letter = group.substring(group.length-1)
        let number = group.substring(0, group.length-1)
        setStudent(firstName, lastName, email, letter, number).then(_ => {
                getGroups()
                success("Ученик добавлен")
                change()
            }
        ).catch(function (_) {
            error("Произошла ошибка при добавлении ученика.")
        })
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Выберите класс</Form.Label>
                <CreatableSelect className="mb-3" onChange={changeGroup} options={allGroups}/>
            </Form.Group>
            <Button className="mb-3" onClick={click}>Добавить</Button>
        </div>
    );
};

export default AddStudent;