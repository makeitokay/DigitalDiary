import React from 'react';
import {setAdmin} from "../../../../http/ItemAPI";
import {error, success} from "../../../../components/Notifications";
import Button from "react-bootstrap/Button";

const AddAdmin = ({firstName, lastName, email, change}) => {
    function click() {
        if (firstName === "" || lastName === "" || email === "") {
            error("Заполните все поля.")
            return
        }
        setAdmin(firstName, lastName, email).then(() => {
            success("Администратор добавлен.")
            change()
        }).catch(_ => {
            error("Ошибка при добавлении администратора.")
        })
    }

    return (
        <div>
            <Button onClick={click}>Добавить</Button>
        </div>
    );
};

export default AddAdmin;