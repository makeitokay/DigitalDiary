import React, {useEffect, useRef, useState} from 'react';
import {$authHost} from "../../../http/Index";
import Form from "react-bootstrap/Form";
import {FormGroup, FormLabel} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getAllClasses} from "../../../http/ItemAPI";
import {ToastContainer} from "react-toastify";
import {goodNotify, notify} from "../../../components/Notifications";

let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
const AddClass = () => {
    const [mainArray, setMainArray] = useState([[], [], [], [], [], [], [], [], [], [], []]);
    let mainLetter = useRef('');
    let mainNumber = useRef('');

    function SelectLetter({numberForm}) {
        if (mainLetter.current === '') {
            mainLetter = mainArray[Number(numberForm) - 1][0]
        }
        for (let i = 0; i < 11; i++) {
            if (i + 1 === Number(numberForm)) {
                return (
                    <Form.Select aria-label="Default select example" onChange={e => mainLetter = e.target.value}>
                        {mainArray[i]?.map(
                            (letter) => <option key={letter}>{letter}</option>
                        )
                        }
                    </Form.Select>
                )
            }
        }
    }

    function SelectNumber({array}) {
        const [number, setNumber] = useState("1");
        if (array === undefined) {
            return (
                <div></div>
            )
        }
        if (mainNumber.current === '') {
            mainNumber = "1"
        }
        return (
            <Form>
                <FormGroup className="mb-3">
                    <FormLabel>Введите номер класса.</FormLabel>
                    <Form.Select aria-label="Default select example" onChange={e => {
                        mainNumber = e.target.value;
                        setNumber(e.target.value)
                    }}>
                        {array.map(
                            (letter) => <option key={letter}>{letter}</option>
                        )
                        }
                    </Form.Select>
                </FormGroup>
                <FormGroup className="mb-3">
                    <FormLabel>Введите букву класса.</FormLabel>
                    <SelectLetter numberForm={number}/>
                </FormGroup>
            </Form>

        )
    }

    function checkLetters(data, number) {
        let arr = data.filter(schoolClass => schoolClass.number === number);
        let arrayLetters = [];
        arr.forEach(element => {
            arrayLetters.push(element.letter)
        })
        return letters.filter(num => !arrayLetters.includes(num));
    }

    function LoadNumbers() {
        $authHost.get('groups').then(data => {
            let array = data.data;
            for (let i = 1; i < 12; i++) {
                setMainArray(mainArray.map((obj, index) => {
                    if (i - 1 === index) {
                        obj.value = checkLetters(array, i);
                    }
                    return obj.value;
                }))
            }
        })
    }

    function click() {
        try {
            getAllClasses(mainLetter, mainNumber).then(_ => {
                LoadNumbers()
            })
            goodNotify("класс добавлен.")
        } catch (e) {
            notify("Не удалось добавить класс.")
        }
    }

    useEffect(() => {
        LoadNumbers()
    }, [])
    return (
        <div>
            <SelectNumber array={numbers}/>
            <Button variant="outline-primary" onClick={click}>Primary</Button>
            <ToastContainer/>
        </div>
    );
};

export default AddClass;