import React from 'react';
import Form from "react-bootstrap/Form";

const numbers = [1,2,3,4,5,6,7,8,9,10,11]
const NumberSelector = ({change}) => {
    function onChange(e){
        change(e.target.value)
    }
    return (
        <Form.Group className="mb-3">
            <Form.Label>Выберите номер класса</Form.Label>
            <Form.Select onChange={onChange}>
                {numbers.map(
                    (number) =>
                        <option key={number}>{number}</option>
                    )
                }
            </Form.Select>
        </Form.Group>
    );
};

export default NumberSelector;