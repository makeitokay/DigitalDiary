import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import {RoleEnum} from "../../../store/RoleEnum";
import AddStudent from "./addUsersPages/AddStudent";
import AddParent from "./addUsersPages/AddParent";
import AddTeacher from "./addUsersPages/AddTeacher";
import AddAdmin from "./addUsersPages/AddAdmin";

const AddUser = () => {
    const [role, setRole] = useState(RoleEnum.Parent)
    const [firstName, setFirstName]= useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    function CreatePageByRole() {
        switch (role){
            case RoleEnum.Student:
                return(
                    <AddStudent firstName={firstName} lastName={lastName} email={email}/>
                )
            case RoleEnum.Parent:
                return(
                    <AddParent firstName={firstName} lastName={lastName} email={email}/>
                )
            case RoleEnum.Teacher:
                return (
                    <AddTeacher firstName={firstName} lastName={lastName} email={email}/>
                )
            case RoleEnum.SchoolAdmin:
                return (
                    <AddAdmin firstName={firstName} lastName={lastName} email={email}/>
            )
            default:
                return (<div/>)
        }
    }
    return (
        <div>
        <Form>
            <Form.Group className="mb-3">
                <Form.Label> Выберите роль пользователя</Form.Label>
                <Form.Select onChange={e => setRole(e.target.value)}>
                    <option value={RoleEnum.Parent}>Родитель</option>
                    <option value={RoleEnum.Student}>Студент</option>
                    <option value={RoleEnum.Teacher}>Учитель</option>
                    <option value={RoleEnum.SchoolAdmin}>Администратор</option>
                </Form.Select>
            </Form.Group>
        </Form>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите имя пользователя</Form.Label>
                        <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите фамилию пользователя</Form.Label>
                        <Form.Control value={lastName} onChange={e => setLastName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Введите email пользователя</Form.Label>
                        <Form.Control value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                </Form>
            <CreatePageByRole/>
        </div>
    );
};

export default AddUser;