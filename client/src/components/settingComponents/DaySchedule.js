import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import Schedule from "./Schedule";
import './Schedule.css'

const DaySchedule = ({teachers, subjects, schedule, dayOfWeek, groupId}) => {
    const [orderSchedules, setOrderSchedules] = useState([])

    function RenderSchedule({order, schedule}) {
        return (
            <Schedule teachers={teachers} schedule={schedule} subjects={subjects} dayOfWeek={dayOfWeek}
                      groupId={groupId} order={order}/>
        )
    }

    useEffect(() => {
        let localOrderGroups = new Array(7)
        for (let i = 0; i < localOrderGroups.length; i++) {
            localOrderGroups[i] = i + 1;
        }
        setOrderSchedules(localOrderGroups)
    }, [])
    if (groupId === undefined) {
        return <div/>
    }
    return (
        <div>
            <h1>{dayOfWeek.label}</h1>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th width="100">№</th>
                    <th>Предмет</th>
                </tr>
                </thead>
                <tbody>
                {orderSchedules.map(order => <RenderSchedule key={order} order={order}
                                                             schedule={schedule?.items.find(item => item.order === order)}/>)}
                </tbody>
            </Table>
        </div>

    );
};

export default DaySchedule;