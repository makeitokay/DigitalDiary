import React, {useEffect, useState} from 'react';
import Select from "react-select";

const AddChild = ({array, change}) => {
    const [allStudents, setAllStudents] = useState([])
    useEffect(() => {
        if (array.length !== 0) {
            let arr = [];
            for (let i = 0; i < array.length; i++) {
                arr.push({
                    label: array[i].lastName +
                        " " + array[i].firstName +
                        " " + array[i].group.number + array[i].group.letter,
                    value: array[i].id
                })
            }
            allStudents.value = arr
            setAllStudents(allStudents.value)
        }
    }, [array])

    function setChange(e) {
        let local = []
        for (let i = 0; i < e.length; i++) {
            local.push(e[i].value)
        }
        change(local)
    }

    return (
        <div>
            <Select
                isMulti
                name="children"
                options={allStudents}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setChange}
                placeholder={"дети"}
            />
        </div>
    );
};

export default AddChild;