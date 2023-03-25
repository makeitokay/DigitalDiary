import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import NumberSelector from "../../../../components/addUserComponents/NumberSelector";
import {getAllGroups, setStudent} from "../../../../http/ItemAPI";
import DataSelector from "../../../../components/addUserComponents/DataSelector";
import Button from "react-bootstrap/Button";
import {error, success} from "../../../../components/Notifications";

const AddStudent = ({firstName,lastName,email}) => {
    const [numberGroup, setNumber] = useState(1)
    const [letterGroup, setLetterGroup] = useState('')
    const [lettersArrayByNumber, setLettersArrayByNumber] = useState([[], [], [], [], [], [], [], [], [], [], []])
    function checkLetters(data, number) {
       return data.filter(schoolClass => schoolClass.number === number);
    }
    function getGroups(){
        getAllGroups().then(data => {
            let array = data.data;
            for (let i = 1; i < 12; i++) {
                setLettersArrayByNumber(lettersArrayByNumber.map((obj, index) => {
                    if (i - 1 === index) {
                        obj.value = checkLetters(array, i);
                    }
                    return obj.value;
                }))
            }
            setLetterGroup(lettersArrayByNumber[0].value[0].letter)
        }).catch(function (_) {
            error("Произошла ошибка.")
        })
    }
    useEffect(() => {
        getGroups()
    },[])
    function changeNumber(number){
        setNumber(number)
        if (lettersArrayByNumber[number-1].length === 0){
            setLetterGroup("")
        } else{
            let check = false
            for (let i = 0; i < lettersArrayByNumber[number-1].length; i++){
                if (lettersArrayByNumber[number-1][i].letter === letterGroup){
                    check = true
                }
            }
            if (!check){
                setLetterGroup(lettersArrayByNumber[number-1][0].letter)
            }
        }
    }
    function changeLetter(lett){
        setLetterGroup(lett)
    }
    function click(){
        if (firstName ==="" || lastName === "" || email ==="" || letterGroup === null){
            error("Заполните все поля.")
            return
        }
        setStudent(firstName,lastName,email,letterGroup,numberGroup).then(_ => {
            getGroups()
            success("Ученик добавлен")
        }
        ).catch(function (_) {
            error("Произошла ошибка при добавлении ученика.")
        })
    }
    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <NumberSelector change={changeNumber}/>
                    <DataSelector change={changeLetter} array={lettersArrayByNumber[numberGroup-1]}/>
                </Form.Group>
                <Button className="mb-3" variant="outline-primary" onClick={click}>Добавить</Button>
            </Form>
        </div>
    );
};

export default AddStudent;