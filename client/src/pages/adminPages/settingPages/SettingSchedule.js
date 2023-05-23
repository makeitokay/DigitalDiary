import React, {useEffect, useState} from 'react';
import {Row} from "react-bootstrap";
import {getAllGroups, getAllSchedule, getAllSubject, getAllTeacher} from "../../../http/ItemAPI";
import DaySchedule from "../../../components/settingComponents/DaySchedule";
import Col from "react-bootstrap/Col";
import {DayOFWeekEnum} from "../../../store/DayOFWeekEnum";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import '../../../components/settingComponents/Schedule.css';
import PacmanLoader from "react-spinners/ClipLoader";
import axios from "axios";

const SettingSchedule = () => {
    const firstColumn = [1, 2, 3];
    const secondColumn = [4, 5, 6];
    const [schedulesByDay, setSchedulesByDay] = useState([null, null, null, null, null, null])
    const [teachers, setTeachers] = useState([])
    const [subjects, setSubjects] = useState([])
    const [groups, setGroups] = useState([])
    const [groupId, setGroupId] = useState()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.all(
            [getAllTeacher(), getAllSubject(), getAllSchedule(groupId), getAllGroups()]
        ).then(axios.spread((teachersApi, subjectsApi, schedulesApi, groupsApi) => {
            //work with teachers
            for (let i = 0; i < teachersApi.data.length; i++) {
                setTeachers(teachersApi.data)
            }
            //work with subjects
            for (let i = 0; i < subjectsApi.data.length; i++) {
                setSubjects(subjectsApi.data)
            }
            //work with schedules
            if (schedulesApi !== null) {
                let i = 1;
                setSchedulesByDay(schedulesByDay?.map(day => {
                    day = schedulesApi.data.items.find(day => day.dayOfWeek === i)
                    ++i
                    return day
                }))
            }
            //work with groups
            let localGroups = []
            for (let i = 0; i < groupsApi.data.length; i++) {
                localGroups.push({
                    value: groupsApi.data[i].id,
                    label: groupsApi.data[i].number + groupsApi.data[i].letter
                })
            }
            setGroups(localGroups)
        }))
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [groupId])

    function Day({dayId}) {
        for (let dayOfWeek in DayOFWeekEnum) {
            if (DayOFWeekEnum[dayOfWeek].value === dayId) {
                return <DaySchedule groupId={groupId} teachers={teachers} subjects={subjects}
                                    dayOfWeek={DayOFWeekEnum[dayOfWeek]}
                                    schedule={schedulesByDay[dayId - 1]}/>;
            }
        }
    }

    function changeGroup(e) {
        setGroupId(e.value)
    }

    return (
        <div>
            <Form.Group className="mb-3">
                <Form.Label>Выберите класс</Form.Label>
                <Select options={groups} onChange={changeGroup} placeholder={"класс"}/>
            </Form.Group>
            {loading ?
                <div className="clip">
                    <PacmanLoader

                        color={"#36a0d6"}
                        loading={loading}
                        cssOverride={{}}
                        size={30}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div> :
                <div>
                    <Row>
                        <Col>
                            <div>
                                {firstColumn.map((id) => <Day key={id} dayId={id}/>)}
                            </div>
                        </Col>
                        <Col md={{offset: 1}}>
                            <div>
                                {secondColumn.map((id) => <Day key={id} dayId={id}/>)}
                            </div>
                        </Col>
                    </Row>
                </div>
            }
        </div>
    );
};

export default SettingSchedule;