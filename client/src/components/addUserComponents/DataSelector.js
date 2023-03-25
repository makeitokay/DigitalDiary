import React from 'react';
import Form from "react-bootstrap/Form";

const DataSelector = ({change,array}) => {
    function onChange(e){
        change(e.target.value)
    }
    return (
        <Form.Group>
            <Form.Label>Выберите букву класса</Form.Label>
            <Form.Select onChange={onChange}>
                {array?.map(
                    (data) =>
                        <option key={data.letter}>{data.letter}</option>
                )
                }
            </Form.Select>
        </Form.Group>
    );
};

export default DataSelector;