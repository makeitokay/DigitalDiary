import React, {useEffect, useState} from 'react';
import {getChildren, getDiaryApi} from "../../http/ItemAPI";
import {$authHost} from "../../http/Index";
import {Row, Stack, Table} from "react-bootstrap";
import {DayOFWeekEnum} from "../../store/DayOFWeekEnum";
import Col from "react-bootstrap/Col";
import Select from "react-select";
import {error} from "../../components/Notifications";
import {ToastContainer} from "react-toastify";
import Form from "react-bootstrap/Form";
import "./DiaryPage.css"
import {AttendanceEnum} from "../../store/AttendanceEnum";

const DiaryPage = () => {
    const [role, setRole] = useState("")
    const firstColumn = [1, 2, 3];
    const secondColumn = [4, 5, 6];
    const [availableWeeks, setAvailableWeeks] = useState([])
    const [diary, setDiary] = useState(null)
    const [week, setWeek] = useState('')
    const [availableChildren, setAvailableChildren] = useState([])
    const [child, setChild] = useState("")

    function getDiaryByRole(funcWeek, childId = null) {
        if (childId === null) {
            getDiaryApi(funcWeek).then(data => {
                getDiary(funcWeek, data)
            })
        } else {
            getDiaryApi(funcWeek, childId).then(data => {
                getDiary(funcWeek, data)
            })
        }
    }

    function getDiary(funcWeek, data) {
        let localWeeks = []
        for (let i = 0; i < data.data.availableWeeks.length; i++) {
            let strTime = data.data.availableWeeks[i].start.substring(8, 10) + "." + data.data.availableWeeks[i].start.substring(5, 7)
                + " - " + data.data.availableWeeks[i].end.substring(8, 10) + "." + data.data.availableWeeks[i].end.substring(5, 7)
            localWeeks.push({label: strTime, value: data.data.availableWeeks[i].number})
        }
        if (funcWeek === 1) {
            setWeek(localWeeks[0])
        }
        setAvailableWeeks(localWeeks)
        setDiary(data.data.items)
    }

    function selectWeek(e) {
        setWeek(e)
        if (role === "Student") {
            getDiaryByRole(e.value)
        } else {
            getDiaryByRole(e.value, child)
        }
    }

    function selectChild(e) {
        if (week === "") {
            getDiaryByRole(1, e.value)
        } else {
            getDiaryByRole(week.value, e.value)
        }
        setChild(e.value)
    }

    function DiaryLine({order, subject, mark, homework}) {
        return (
            <tr>
                <td>{order}</td>
                <td>{subject}</td>
                <td>{homework}</td>
                <td>{mark?.mark === null ? AttendanceEnum[mark?.attendance] : mark?.mark}</td>
            </tr>
        )
    }

    function DayDiary({dayOfWeek}) {
        let dayLessons = new Array(7)
        for (let i = 0; i < 7; i++) {
            dayLessons[i] = {order: i + 1, subject: " ", mark: " ", homework: " "}
        }
        if (diary !== null) {
            let notNullLessons = diary[dayOfWeek]
            for (let i = 0; i < notNullLessons.length; i++) {
                dayLessons[Number(notNullLessons[i].order)-1] = notNullLessons[i]
            }
        }
        return (
            <div>
                <h1>{DayOFWeekEnum[dayOfWeek].label}</h1>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th width="40">№</th>
                        <th width="200">Предмет</th>
                        <th>Домашняя работа</th>
                        <th width="80">Оценка</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dayLessons.map(lesson => <DiaryLine order={lesson?.order} subject={lesson?.subject}
                                                         mark={lesson?.mark} homework={lesson?.homework}/>)}
                    </tbody>
                </Table>
            </div>
        )
    }

    function Day({dayId}) {
        for (let dayOfWeek in DayOFWeekEnum) {
            if (DayOFWeekEnum[dayOfWeek].value === dayId) {
                return <DayDiary dayOfWeek={dayOfWeek}/>;
            }
        }
    }

    useEffect(() => {
        $authHost.get('users/me').then(data => {
            setRole(data.data.role)
            if (data.data.role === "Student") {
                getDiaryByRole(1)
            } else {
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
            {role === "Parent" ?
                <Stack direction="horizontal">
                    <Form className="mb-3 me-3">
                        <Form.Group>
                            <Form.Label>Выбор ученика.</Form.Label>
                            <Select options={availableChildren} onChange={selectChild}/>
                        </Form.Group>
                    </Form>
                    <Form className="mb-3 me-3">
                        <Form.Group>
                            <Form.Label>Выбор недели.</Form.Label>
                            <Select options={availableWeeks} onChange={selectWeek} value={week}/>
                        </Form.Group>
                    </Form>
                </Stack>
                : <Form className="mb-3 me-3">
                    <Form.Group>
                        <Form.Label>Выбор недели.</Form.Label>
                        <Select className="selector" options={availableWeeks} onChange={selectWeek} value={week}/>
                    </Form.Group>
                </Form>}
            <Row>
                <Col>
                    <div>
                        {firstColumn.map((id) => <Day dayId={id}/>)}
                    </div>
                </Col>
                <Col md={{offset: 1}}>
                    <div>
                        {secondColumn.map((id) => <Day dayId={id}/>)}
                    </div>
                </Col>
            </Row>
            <ToastContainer/>
        </div>
    );
};

export default DiaryPage;