import React, {useEffect, useState} from 'react';
import AddChild from "../../../../components/addUserComponents/AddChild";
import {getAllStudents, setParent} from "../../../../http/ItemAPI";
import Button from "react-bootstrap/Button";
import {error, success} from "../../../../components/Notifications";
const AddParent = ({firstName,lastName,email}) => {
    const [allStudents, setAllStudents] = useState([])
    const [childArray,setChildArray] = useState([])
    const [countChildren,setCountChildren] = useState(0)
    useEffect(()=>{
        getAllStudents().then(
            data=>{
                setAllStudents(data.data)
            }
        )
    },[])
    function addChild(firstName,lastName,number,letter){
        let answer = allStudents.find(student => student.firstName === firstName &&
            student.lastName === lastName &&
            student.group.number === number &&
            student.group.letter === letter
        ).id
        if (childArray.indexOf(answer)!==-1){
            error("Этот ребенок уже привязан к родителю.")
        } else{
            if (childArray.length === 0){
                childArray.value = []
            } else{
                childArray.value = childArray
            }
            childArray.value.push(answer)
            setChildArray(childArray.value)
            setCountChildren(countChildren+1)
            success("Ребенок добавлен к родителю.")
        }
    }
    function click(){
        if (firstName ==="" || lastName === "" || email ==="" || childArray.length === 0){
            error("Заполните все поля.")
            return
        }
        setParent(firstName,lastName,email,childArray).then(_=>{
            success("Родитель добавлен.")
        }).catch(_ =>{
            error("Не удалось добавить родителя.")
        })
    }
    return (
        <div>
            <AddChild array={allStudents} change={addChild}/>
            <div className="mb-3">
                Количество детей - {childArray.length}
            </div>
            <Button onClick={click}>Добавить родителя</Button>
        </div>
    );
};

export default AddParent;