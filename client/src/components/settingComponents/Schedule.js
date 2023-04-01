import React, {useEffect, useState} from 'react';
import {Accordion, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Col from 'react-bootstrap/Col';
import {setSchedule} from "../../http/ItemAPI";

const Schedule = ({teachers, subjects, schedule, dayOfWeek, id, groupId}) => {
    const [header, setHeader] = useState('пусто')
    const [teacher, setTeacher] = useState(undefined)
    const [subject, setSubject] = useState(undefined)
    const [teachersForSelect, setTeachersForSelect] = useState([])
    const [subjectsForSelect, setSubjectsForSelect] = useState([])
    const [synchronization, setSynchronization] = useState("Синхронизован.")

    function changeSubject(e) {
        let localSubject = subjects?.find(sub => sub.id === e.value)
        if (teacher !== undefined) {
            setHeader(teacher.firstName + " " + teacher.lastName + ", " + localSubject.name)
        } else {
            setHeader(localSubject.name)
        }
        setSubject(localSubject)
        setSynchronization("Не синхронизован")
    }

    function changeTeacher(e) {
        let localTeacher = teachers?.find(teacher => teacher.id === e.value)
        if (subject !== undefined) {
            setHeader(localTeacher.firstName + " " + localTeacher.lastName + ", " + subject.name)
            setSchedule(dayOfWeek.value, subject.id, localTeacher.id, id, groupId).then(() => {
                setSynchronization("Синхронизован")
            }).catch(function (e) {
                setSynchronization(e.response.data)
            })
        } else {
            setHeader(localTeacher.firstName + " " + localTeacher.lastName)
            setSynchronization("Не синхронизован")
        }
        setTeacher(localTeacher)
    }

    useEffect(() => {
        let localTeachers = []
        let localSubjects = []
        if (teachers !== undefined) {
            for (let i = 0; i < teachers.length; i++) {
                localTeachers.push({label: teachers[i].firstName + " " + teachers[i].lastName, value: teachers[i].id})
            }
            setTeachersForSelect(localTeachers)
        }
        if (subjects !== undefined) {
            for (let i = 0; i < subjects.length; i++) {
                localSubjects.push({label: subjects[i].name, value: subjects[i].id})
            }
            setSubjectsForSelect(localSubjects)
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
            <td>{id + ". " + synchronization}</td>
            <td>
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{header}</Accordion.Header>
                        <Accordion.Body>
                            <Form>
                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Выберите предмет</Form.Label>
                                        <Select options={subjectsForSelect} onChange={changeSubject}>
                                        </Select>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Выберите учителя</Form.Label>
                                        <Select options={teachersForSelect} onChange={changeTeacher}>
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