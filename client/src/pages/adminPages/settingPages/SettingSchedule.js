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
        <div className="tb">
            <Form.Group className="mb-3">
                <Form.Label>Выберите класс</Form.Label>
                <Select options={groups} onChange={changeGroup}/>
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