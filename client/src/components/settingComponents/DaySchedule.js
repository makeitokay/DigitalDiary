import React from 'react';
import {Table} from "react-bootstrap";
import Schedule from "./Schedule";

const DaySchedule = ({teachers, subjects, lessons, dayOfWeek, groupId}) => {
    let schedules = [1, 2, 3, 4, 5, 6, 7]

    function RenderSchedule({id, schedule}) {
        return (
            <Schedule teachers={teachers} schedule={schedule} subjects={subjects} dayOfWeek={dayOfWeek}
                      groupId={groupId} id={id}/>
        )
    }

    return (
        <div>
            <h1>{dayOfWeek.label}</h1>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Предмет</th>
                </tr>
                </thead>

                <tbody>
                {schedules.map(id => <RenderSchedule key={id} id={id}
                                                     schedule={lessons?.items.find(item => item.order === id)}/>)}
                </tbody>
            </Table>
        </div>

    );
};

export default DaySchedule;