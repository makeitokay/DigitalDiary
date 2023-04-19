import React, {useEffect, useState} from 'react';
import QuarterReportTable from "../../components/QuarterReportTable";
import {$authHost} from "../../http/Index";
import {getChildren} from "../../http/ItemAPI";
import {error} from "../../components/Notifications";
import {RoleEnum} from "../../store/RoleEnum";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import "./QuarterReport.css"
import {Stack} from "react-bootstrap";

const QuarterReportPage = () => {
    const [userRole, setUserRole] = useState("")
    const [availableChildren, setAvailableChildren] = useState([])
    const [currentChild, setCurrentChild] = useState(undefined)
    const [currentQuarter, setCurrentQuarter] = useState(null)
    const [availableQuarters, setAvailableQuarters] = useState([])

    function changeQuarter(e) {
        setCurrentQuarter(e.value)
    }

    function changeAllQuarters(e) {
        setAvailableQuarters(e)
    }

    useEffect(() => {
        $authHost.get('users/me').then(data => {
            setUserRole(data.data.role)
            if (data.data.role === RoleEnum.Parent) {
                getChildren().then(data => {
                    let localChildren = []
                    for (let i = 0; i < data.data.length; i++) {
                        localChildren.push({
                            label: data.data[i].firstName + " " + data.data[i].lastName,
                            value: data.data[i].id
                        })
                    }
                    setAvailableChildren(localChildren)
                }).catch(_ => error("Ошибка на сервере."))
            }
        })
    }, [])
    return (
        <div className="page">
            <Stack direction="horizontal">
                {userRole === RoleEnum.Parent ?
                    <Form.Group className="sel">
                        <Form.Label>Ученик</Form.Label>
                        <Select options={availableChildren} onChange={e => setCurrentChild(e)}/>
                    </Form.Group>
                    : <div/>}
                <Form.Group className="sel">
                    <Form.Label>Четверть</Form.Label>
                    <Select options={availableQuarters} onChange={changeQuarter}/>
                </Form.Group>
            </Stack>
            <QuarterReportTable childId={currentChild} currentQuarter={currentQuarter}
                                changeQuarter={changeAllQuarters}/>
        </div>
    );
};

export default QuarterReportPage;