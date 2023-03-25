import React, {useEffect, useState} from 'react';
import {getAllGroups, setStudent} from "../../../../http/ItemAPI";
import {error, success} from "../../../../components/Notifications";
import Button from "react-bootstrap/Button";
import CreatableSelect from "react-select/creatable";
import Form from "react-bootstrap/Form";
const AddStudent = ({firstName,lastName,email}) => {
    const [allGroups, setAllGroups] = useState([])
    const [group, setGroup] = useState("")
    function getGroups(){
        getAllGroups().then(data => {
            let array = data.data;
            let local = []
            for (let i = 0; i < array.length; i++) {
                local.push({label: array[i].number+array[i].letter, value: array[i].id})
            }
            allGroups.value = local
            setAllGroups(allGroups.value)
        }).catch(function (_) {
            error("Произошла ошибка.")
        })
    }
    useEffect(() => {
        getGroups()
    },[])

    function change(e){
        setGroup(e.label)
    }
    function click(){
        if (firstName ==="" || lastName === "" || email ==="" || group === ""){
            error("Заполните все поля.")
            return
        }
        setStudent(firstName,lastName,email,group[1],group[0]).then(_ => {
            getGroups()
            success("Ученик добавлен")
        }
        ).catch(function (_) {
            error("Произошла ошибка при добавлении ученика.")
        })
    }
    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Выберите класс</Form.Label>
                <CreatableSelect className="mb-3" onChange={change} options={allGroups}/>
            </Form.Group>
            <Button className="mb-3" onClick={click}>Добавить</Button>
        </div>
    );
};

export default AddStudent;