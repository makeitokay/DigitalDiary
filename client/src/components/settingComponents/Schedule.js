import React, {useEffect, useState} from 'react';
import {Accordion, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Col from 'react-bootstrap/Col';
import {setSchedule} from "../../http/ItemAPI";
import './Schedule.css'

const Schedule = ({teachers, subjects, schedule, dayOfWeek, order, groupId}) => {
    const [header, setHeader] = useState('Не выбрано.')
    const [teacher, setTeacher] = useState(undefined)
    const [subject, setSubject] = useState(undefined)
    const [availableTeachers, setAvailableTeachers] = useState([])
    const [availableSubjects, setAvailableSubjects] = useState([])
    const [synchronization, setSynchronization] = useState("Сохранено")
    const [isAlertVisible, setIsAlertVisible] = React.useState(false);

    function changeSubject(e) {
        let localSubject = subjects?.find(sub => sub.id === e.value)
        if (teacher !== undefined) {
            setHeader(teacher.firstName + " " + teacher.lastName + ", " + localSubject.name)
            setSchedule(dayOfWeek.value, localSubject.id, teacher.id, order, groupId).then(() => {
                setSynchronization("Сохранено")
            }).catch(function (e) {
                if (e.response.status === 400) {
                    setSynchronization(e.response.data)
                } else {
                    setSynchronization("Не сохранено")
                }
            })
            setIsAlertVisible(true);
        } else {
            setHeader(localSubject.name)
        }
        setSubject(localSubject)
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
    }

    function changeTeacher(e) {
        let localTeacher = teachers?.find(teacher => teacher.id === e.value)
        if (subject !== undefined) {
            setHeader(localTeacher.firstName + " " + localTeacher.lastName + ", " + subject.name)
            setSchedule(dayOfWeek.value, subject.id, localTeacher.id, order, groupId).then(() => {
                setSynchronization("Сохранено")
            }).catch(function (e) {
                if (e.response.status === 400) {
                    setSynchronization(e.response.data)
                } else {
                    setSynchronization("Не сохранено")
                }
            })
            setIsAlertVisible(true);
        } else {
            setHeader(localTeacher.firstName + " " + localTeacher.lastName)
        }
        setTeacher(localTeacher)
        setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
    }

    useEffect(() => {
        let localTeachers = []
        let localSubjects = []
        if (teachers !== undefined) {
            for (let i = 0; i < teachers.length; i++) {
                localTeachers.push({label: teachers[i].firstName + " " + teachers[i].lastName, value: teachers[i].id})
            }
            setAvailableTeachers(localTeachers)
        }
        if (subjects !== undefined) {
            for (let i = 0; i < subjects.length; i++) {
                localSubjects.push({label: subjects[i].name, value: subjects[i].id})
            }
            setAvailableSubjects(localSubjects)
        }
        let localTeacher = teachers?.find(teacher => teacher.id === schedule?.teacherId)
        let localSubject = subjects?.find(subject => subject.id === schedule?.subjectId)
        if (localTeacher !== undefined && localSubject !== undefined) {
            setTeacher(localTeacher)
            setSubject(localSubject)
            setHeader(localTeacher.firstName + " " + localTeacher.lastName + ", " + localSubject.name)
        }
    }, [])

    return (
        <tr>
            <td>
                <div>{order} {isAlertVisible ?
                    <div>{synchronization === "Сохранено" ? <div className="success">{synchronization}</div>
                        : <div className="error">{synchronization}</div>}
                    </div> : <div/>}</div>
            </td>
            <td>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{header}</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Предмет</Form.Label>
                                        <Select options={availableSubjects} onChange={changeSubject}
                                                value={{
                                                    label: subject !== undefined ? subject?.name : "",
                                                    value: subject !== undefined ? subject?.id : -1
                                                }}>
                                        </Select>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Учитель</Form.Label>
                                        <Select options={availableTeachers} onChange={changeTeacher} value={{
                                            label: teacher !== undefined ? teacher?.firstName + " " + teacher?.lastName : "",
                                            value: teacher !== undefined ? teacher?.id : -1
                                        }}>
                                        </Select>
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </td>
        </tr>
    );
};

export default Schedule;