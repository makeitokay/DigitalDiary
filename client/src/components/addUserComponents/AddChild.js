import React, {useEffect, useState} from 'react';
import CreatableSelect from 'react-select/creatable';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const AddChild = ({array,change}) => {
    const [firstNamesAllStudents, setFirstNamesAllStudents] = useState([])
    const [lastNamesAllStudents, setLastNamesAllStudents] = useState([])
    const [AllGroupsNumbers, setAllGroupsNumbers] = useState([])
    const [AllGroupsLetters, setAllGroupsLetters] = useState([])
    const [childName, setChildName] = useState("")
    const [childSurname, setChildSurname] = useState("")
    const [childNumber, setChildNumber] = useState(0)
    const [childLetter, setChildLetter] = useState("")
    const [localArray, setLocalArray]= useState([])
    function getUniqData(data,number, arr){
        data.value = [];
        switch (number){
            case 0:
                for (let i = 0; i< arr.length; i++){
                    data.value.push({label: arr[i].firstName,value:arr[i].firstName})
                }
                break
            case 1:
                for (let i = 0; i< arr.length; i++){
                    data.value.push({label: arr[i].lastName,value:arr[i].lastName})
                }
                break
            case 2:
                for (let i = 0; i< arr.length; i++){
                    data.value.push({label: arr[i].group.number,value:arr[i].group.number})
                }
                break
            case 3:
                for (let i = 0; i< arr.length; i++){
                    data.value.push({label: arr[i].group.letter,value:arr[i].group.letter})
                }
                break
        }
        data.value = [...new Map(data.value.map((item) => [item["value"], item])).values()];
        return data.value
    }
    useEffect(()=>{
        setLocalArray(array)
        if (array.length!==0){
            setFirstNamesAllStudents(getUniqData(firstNamesAllStudents,0,array))
            setLastNamesAllStudents(getUniqData(lastNamesAllStudents,1,array))
            setAllGroupsNumbers(getUniqData(AllGroupsNumbers,2,array))
            setAllGroupsLetters(getUniqData(AllGroupsLetters,3,array))
        }
    },[array])
    function changeName(data){
        let local;
        if (data === null){
            local = array
            setChildName("")
            if(childSurname !==""){
                local = local.filter(child => child.lastName === childSurname)
            }
            if (childLetter !== ""){
                local = local.filter(child => child.group.letter === childLetter)
            }
            if (childNumber !== 0){
                local = local.filter(child => child.group.number === childNumber)
            }
        } else {
            setChildName(data.value)
            local = localArray.filter(child => child.firstName === data.value)
        }
        setLastNamesAllStudents(getUniqData(lastNamesAllStudents, 1, local))
        setAllGroupsNumbers(getUniqData(AllGroupsNumbers, 2, local))
        setAllGroupsLetters(getUniqData(AllGroupsLetters, 3, local))
        localArray.value = local
        setLocalArray(localArray.value)
    }
    function changeLastName(data){
        let local;
        if (data === null){
            local = array
            setChildSurname("")
            if(childName !==""){
                local = local.filter(child => child.firstName === childName)
            }
            if (childLetter !== ""){
                local = local.filter(child => child.group.letter === childLetter)
            }
            if (childNumber !== 0){
                local = local.filter(child => child.group.number === childNumber)
            }
        } else {
            setChildSurname(data.value)
            local = localArray.filter(child => child.lastName === data.value)
        }
        setFirstNamesAllStudents(getUniqData(firstNamesAllStudents, 0, local))
        setAllGroupsNumbers(getUniqData(AllGroupsNumbers, 2, local))
        setAllGroupsLetters(getUniqData(AllGroupsLetters, 3, local))
        localArray.value = local
        setLocalArray(localArray.value)
    }
    function changeNumberGroup(data){
        let local;
        if (data === null){
            local = array
            setChildNumber(0)
            if(childName !==""){
                local = local.filter(child => child.firstName === childName)
            }
            if(childSurname !==""){
                local = local.filter(child => child.lastName === childSurname)
            }
            if (childLetter !== ""){
                local = local.filter(child => child.group.letter === childLetter)
            }
        } else {
            setChildNumber(data.value)
            local = localArray.filter(child => child.group.number === data.value)
        }
        setFirstNamesAllStudents(getUniqData(firstNamesAllStudents, 0, local))
        setLastNamesAllStudents(getUniqData(lastNamesAllStudents, 1, local))
        setAllGroupsLetters(getUniqData(AllGroupsLetters, 3, local))
        localArray.value = local
        setLocalArray(localArray.value)
    }
    function changeLetterGroup(data){
        let local;
        if (data === null){
            local = array
            setChildLetter("")
            if (childName !== ""){
                local = local.filter(child => child.firstName === childName)
            }
            if(childSurname !==""){
                local = local.filter(child => child.lastName === childSurname)
            }
            if (childNumber !== 0){
                local = local.filter(child => child.group.number === childNumber)
            }
        } else {
            setChildLetter(data.value)
            local = localArray.filter(child => child.group.letter === data.value)
        }
        setFirstNamesAllStudents(getUniqData(firstNamesAllStudents,0,local))
        setLastNamesAllStudents(getUniqData(lastNamesAllStudents,1,local))
        setAllGroupsNumbers(getUniqData(AllGroupsNumbers,2,local))
        localArray.value = local
        setLocalArray(localArray.value)
    }
    function click(){
        change(childName,childSurname,childNumber,childLetter)
    }
    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Введите имя ребенка</Form.Label>
                <CreatableSelect isClearable options={firstNamesAllStudents} onChange={changeName}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите фамилию ребенка</Form.Label>
                <CreatableSelect isClearable options={lastNamesAllStudents} onChange={changeLastName}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите номер класса ребенка</Form.Label>
                <CreatableSelect isClearable options={AllGroupsNumbers} onChange={changeNumberGroup}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Введите букву класса ребенка</Form.Label>
                <CreatableSelect isClearable options={AllGroupsLetters} onChange={changeLetterGroup}/>
            </Form.Group>
            <Button className="mb-3" variant="outline-primary" onClick={click}>Добавить ребенка</Button>
        </div>
    );
};

export default AddChild;