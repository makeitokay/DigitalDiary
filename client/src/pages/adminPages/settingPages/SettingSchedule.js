import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {getAllGroups, getAllSchedule, getAllSubject, getAllTeacher} from "../../../http/ItemAPI";
import DaySchedule from "../../../components/settingComponents/DaySchedule";
import Col from "react-bootstrap/Col";
import {DayOFWeekEnum} from "../../../store/DayOFWeekEnum";
import Select from "react-select";
import Form from "react-bootstrap/Form";

const SettingSchedule = () => {
    const idFistColum = [1, 2, 3];
    const idSecondColum = [4, 5, 6];
    const [schedulesByDay, setSchedulesByDay] = useState([null, null, null, null, null, null])
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState()
    useEffect(() => {
        getAllTeacher().then(data => {
            for (let i = 0; i < data.data.length; i++) {
                setTeachers(data.data)
            }
        })
        getAllSubject().then(data => {
            for (let i = 0; i < data.data.length; i++) {
                setSubjects(data.data)
            }
        })
        getAllSchedule(groupId).then(data => {
            if (data !== null) {
                let i = 1;
                setSchedulesByDay(schedulesByDay?.map(day => {
                    day = data.data.items.find(day => day.dayOfWeek === i)
                    ++i
                    return day
                }))
            }
        })
        getAllGroups().then(data => {
            let localGroups = []
            for (let i = 0; i < data.data.length; i++) {
                localGroups.push({value: data.data[i].id, label: data.data[i].number + data.data[i].letter})
            }
            setGroups(localGroups.sort((x, y) => x.label > y.label ? 1 : x.label === y.label ? 0 : -1))
        })
    }, [groupId])

    function Day({id}) {
        switch (id) {
            case 1:
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum.Monday}
                                    lessons={schedulesByDay[0]}/>;
            case 2:
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum.Tuesday}
                                    lessons={schedulesByDay[1]}/>;
            case 3:
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum.Wednesday}
                                    lessons={schedulesByDay[2]}/>;
            case 4:
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum.Thursday}
                                    lessons={schedulesByDay[3]}/>;
            case 5:
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum.Friday}
                                    lessons={schedulesByDay[4]}/>;
            case 6:
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum.Saturday}
                                    lessons={schedulesByDay[5]}/>;
            default:
                return <div/>
        }
    }

    function changeGroup(e) {
        setGroupId(e.value)
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Выберите класс</Form.Label>
                <Select options={groups} onChange={changeGroup}/>
            </Form.Group>
            <Row>
                <Col>
                    <div>
                        {idFistColum.map((id) => <Day key={id} id={id}/>)}
                    </div>
                </Col>
                <Col md={{offset: 1}}>
                    <div>
                        {idSecondColum.map((id) => <Day key={id} id={id}/>)}
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default SettingSchedule;