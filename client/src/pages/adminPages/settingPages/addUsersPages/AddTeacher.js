import React from 'react';
import {setTeacher} from "../../../../http/ItemAPI";
import {error, success} from "../../../../components/Notifications";
import Button from "react-bootstrap/Button";

const AddTeacher = ({firstName,lastName,email}) => {
    function click(){
        if (firstName ==="" || lastName === "" || email ===""){
            error("Заполните все поля.")
            return
        }
        setTeacher(firstName,lastName,email).then(() =>{
            success("Учитель добавлен.")
        }).catch(_ => {
            error("Ошибка при добавлении учителя.")
        })
    }
    return (
        <div>
            <Button onClick={click}>Добавить</Button>
        </div>
    );
};
export default AddTeacher;