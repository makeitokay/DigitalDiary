import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./Statistic.css"
import {
    getAllGroups,
    getAllTeacher,
    getGroupsAndSubjectsForJournal,
    getStatisticAttendance,
    getStatisticMarks
} from "../../http/ItemAPI";
import {Accordion, Stack} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import {CChart} from "@coreui/react-chartjs";
import {AttendanceEnum} from "../../store/AttendanceEnum";

function StatisticPage() {
    const [date, setDate] = useState(new Date());
    const [availableGroupsAndSubjects, setAvailableGroupsAndSubjects] = useState([])
    const [availableTeachers, setAvailableTeachers] = useState([])
    const [currentTeacher, setCurrentTeacher] = useState(null)
    const [currentGroup, setCurrentGroup] = useState(null)
    const [currentSubject, setCurrentSubject] = useState(null)
    const [isDisTeacherSelect, setIsDisTeacherSelect] = useState(false)
    const [isDisGroupAndSubjectSelect, setIsDisGroupAndSubjectSelect] = useState(false)
    const [labelForMarks, setLabelForMarks] = useState([])
    const [valueForMarks, setValueForMarks] = useState([])
    const [availableGroups, setAvailableGroups] = useState([])
    const [currentGroupForAttendance, setCurrentGroupForAttendance] = useState(null)
    const [currentTypeAttendance, setCurrentTypeAttendance] = useState(null)
    const [dataForAttendance, setDataForAttendance] = useState([])
    const [dateAttendance, setDateAttendance] = useState(new Date())

    function getStatAttendance(groupId, attendance, optionDate = null) {
        let start;
        let end;
        if (optionDate === null) {
            if (date.length > 0) {
                const offset = dateAttendance[0].getTimezoneOffset()
                let qw = new Date(dateAttendance[0].getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                const offset2 = dateAttendance[1].getTimezoneOffset()
                qw = new Date(dateAttendance[1].getTime() - (offset2 * 60 * 1000))
                end = qw.toISOString().split('T')[0]
            } else {
                const offset = dateAttendance.getTimezoneOffset()
                let qw = new Date(dateAttendance.getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                end = qw.toISOString().split('T')[0]
            }
        } else {
            if (optionDate.length > 0) {
                const offset = optionDate[0].getTimezoneOffset()
                let qw = new Date(optionDate[0].getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                const offset2 = optionDate[1].getTimezoneOffset()
                qw = new Date(optionDate[1].getTime() - (offset2 * 60 * 1000))
                end = qw.toISOString().split('T')[0]
            } else {
                const offset = optionDate.getTimezoneOffset()
                let qw = new Date(optionDate.getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                end = qw.toISOString().split('T')[0]
            }
        }
        getStatisticAttendance(groupId, attendance, start, end).then(data => {
            setDataForAttendance(data.data.statistics)
        })
    }

    function getStatMarks(groupId, teacherId, subjectId, optionDate = null) {
        let start;
        let end;
        if (optionDate === null) {
            if (date.length > 0) {
                const offset = date[0].getTimezoneOffset()
                let qw = new Date(date[0].getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                const offset2 = date[1].getTimezoneOffset()
                qw = new Date(date[1].getTime() - (offset2 * 60 * 1000))
                end = qw.toISOString().split('T')[0]
            } else {
                const offset = date.getTimezoneOffset()
                let qw = new Date(date.getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                end = qw.toISOString().split('T')[0]
            }
        } else {
            if (optionDate.length > 0) {
                const offset = optionDate[0].getTimezoneOffset()
                let qw = new Date(optionDate[0].getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                const offset2 = optionDate[1].getTimezoneOffset()
                qw = new Date(optionDate[1].getTime() - (offset2 * 60 * 1000))
                end = qw.toISOString().split('T')[0]
            } else {
                const offset = optionDate.getTimezoneOffset()
                let qw = new Date(optionDate.getTime() - (offset * 60 * 1000))
                start = qw.toISOString().split('T')[0]
                end = qw.toISOString().split('T')[0]
            }
        }
        getStatisticMarks(groupId, teacherId, subjectId, start, end).then((data) => {
            let localLabel = []
            let localMarksForGraphics = []
            Object.keys(data.data.statistics).forEach(label => {
                localLabel.push(label)
                localMarksForGraphics.push(data.data.statistics[label])
            })
            setLabelForMarks(localLabel)
            setValueForMarks(localMarksForGraphics)
        })
    }

    function changeTeacher(e) {
        setCurrentTeacher(e)
        if (e.value !== null) {
            setIsDisGroupAndSubjectSelect(true)
        } else {
            setIsDisGroupAndSubjectSelect(false)
        }
        if (e.value !== null) {
            getStatMarks(currentGroup, e.value, currentSubject)
        }
    }

    function changeGroupAndSubject(e) {
        if (e.value === null) {
            setCurrentGroup(null)
            setCurrentSubject(null)
            setIsDisTeacherSelect(false)
        } else {
            setCurrentGroup(e.value.group)
            setCurrentSubject(e.value.subject)
            setIsDisTeacherSelect(true)
            getStatMarks(e.value.group, currentTeacher.value, e.value.subject)
        }
    }

    function changeDate(e) {
        setDate(e)
        if (currentTeacher !== null || currentGroup !== null) {
            getStatMarks(currentGroup, currentTeacher.value, currentSubject, e)
        }
    }

    function changeDateForAttendance(e) {
        setDateAttendance(e)
        if (currentGroupForAttendance !== null || currentTypeAttendance !== null) {
            getStatAttendance(currentGroupForAttendance, currentTypeAttendance, e)
        }
    }

    function changeGroup(e) {
        setCurrentGroupForAttendance(e.value)
        if (currentTypeAttendance !== null) {
            getStatAttendance(e.value, currentTypeAttendance)
        }
    }

    function changeTypeAttendance(e) {
        setCurrentTypeAttendance(e.value)
        if (currentGroupForAttendance !== null) {
            getStatAttendance(currentGroupForAttendance, e.value)
        }
    }


    useEffect(() => {
        getGroupsAndSubjectsForJournal().then(data => {
            let localGroupsAndSubjects = [{label: "Не выбрано", value: null}]
            for (let i = 0; i < data.data.length; i++) {
                localGroupsAndSubjects.push({
                    value: {group: data.data[i].groupId, subject: data.data[i].subjectId},
                    label: data.data[i].name
                })
            }
            setAvailableGroupsAndSubjects(localGroupsAndSubjects)
        })
        getAllTeacher().then(data => {
            let localTeachers = [{label: "Не выбрано", value: null}]
            for (let i = 0; i < data.data.length; i++) {
                localTeachers.push({
                    value: data.data[i].id,
                    label: data.data[i].firstName + " " + data.data[i].lastName
                })
            }
            setAvailableTeachers(localTeachers)
        })
        getAllGroups().then(data => {
            let localGroups = []
            for (let i = 0; i < data.data.length; i++) {
                localGroups.push({value: data.data[i].id, label: data.data[i].number + data.data[i].letter})
            }
            setAvailableGroups(localGroups.sort((x, y) => x.label > y.label ? 1 : x.label === y.label ? 0 : -1))
        })
    }, [])

    return (
        <div className="page">
            <Accordion defaultActiveKey="0" className="mb-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Фильтр статистики</Accordion.Header>
                    <Accordion.Body>
                        <Stack direction="horizontal">
                            <Stack>
                                <Form>
                                    <Stack direction="horizontal">
                                        <Form.Group className="me-4 mb-3">
                                            <Form.Label>Учитель.</Form.Label>
                                            <Select options={availableTeachers} id="teacherSel" onChange={changeTeacher}
                                                    isDisabled={isDisTeacherSelect}></Select>
                                        </Form.Group>
                                        <Form.Group className="me-4 mb-3">
                                            <Form.Label>Класс и группа.</Form.Label>
                                            <Select options={availableGroupsAndSubjects} id="groupsAndSubjectSel"
                                                    isDisabled={isDisGroupAndSubjectSelect}
                                                    onChange={changeGroupAndSubject}></Select>
                                        </Form.Group>
                                    </Stack>
                                </Form>
                                <div className='calendar-container'>
                                    <Calendar
                                        onChange={changeDate}
                                        value={date}
                                        selectRange={true}
                                    />
                                </div>
                            </Stack>
                            <Stack>
                                <Form>
                                    <Stack direction="horizontal">
                                        <Form.Group className="me-4 mb-3">
                                            <Form.Label>Класс.</Form.Label>
                                            <Select options={availableGroups} id="teacherSel"
                                                    onChange={changeGroup}></Select>
                                        </Form.Group>
                                        <Form.Group className="me-4 mb-3">
                                            <Form.Label>Вид пропуска.</Form.Label>
                                            <Select options={Object.keys(AttendanceEnum).map(attendance => (
                                                {label: AttendanceEnum[attendance], value: attendance}
                                            ))} id="groupsAndSubjectSel" onChange={changeTypeAttendance}></Select>
                                        </Form.Group>
                                    </Stack>
                                </Form>
                                <div className='calendar-container'>
                                    <Calendar
                                        onChange={changeDateForAttendance}
                                        value={dateAttendance}
                                        selectRange={true}
                                    />
                                </div>
                            </Stack>
                        </Stack>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Stack direction="horizontal">
                <div className="t">
                    <CChart
                        type="bar"
                        data={{
                            labels: labelForMarks,
                            datasets: [
                                {
                                    label: 'Статистика оценок',
                                    backgroundColor: '#ebd723',
                                    data: valueForMarks,
                                },
                            ],
                        }}
                        labels="months"
                    />
                </div>
                <div className="t">
                    <CChart
                        type="bar"
                        data={{
                            labels: Object.keys(dataForAttendance).map(key => (
                                key
                            )),
                            datasets: [
                                {
                                    label: 'Статистика посещения',
                                    backgroundColor: '#0da9d9',
                                    data: Object.keys(dataForAttendance).map(key => (
                                        dataForAttendance[key]
                                    )),
                                },
                            ],
                        }}
                        labels="months"
                    />
                </div>
            </Stack>

        </div>
    );
}

export default StatisticPage;