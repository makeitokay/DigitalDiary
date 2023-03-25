import React, {useEffect, useState} from 'react';
import Select from "react-select";
const AddChild = ({array,change}) => {
    const [localArray, setLocalArray]= useState([])
    useEffect(()=>{
        if (array.length!==0){
            let arr = [];
            for (let i = 0; i< array.length; i++){
                arr.push({label: array[i].firstName +
                        " " + array[i].lastName +
                        " " + array[i].group.number+array[i].group.letter,
                value: array[i].id})
            }
            localArray.value = arr
            setLocalArray(localArray.value)
        }
    },[array])
    function setChange(e){
        let local = []
        for (let i = 0; i < e.length; i++){
            local.push(e[i].value)
        }
        change(local)
    }
    return (
        <div>
            <Select
                isMulti
                name="children"
                options={localArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setChange}
            />
        </div>
    );
};

export default AddChild;