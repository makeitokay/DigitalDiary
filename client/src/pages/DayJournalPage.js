import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Card, Stack} from "react-bootstrap";
import {getDayFromJournal, postDayJournal} from "../http/ItemAPI";
import {useTable} from "react-table";
import "./JournalPage.css"
import {AttendanceEnum} from "../store/AttendanceEnum";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {JOURNAL_PAGE_ROUTE} from "../utils/Const";
import {error, success} from "../components/Notifications";
import {ToastContainer} from "react-toastify";

const DayJournalPage = () => {
        const [studentsForTable, setStudentsForTable] = useState([])
        const dataAboutLesson = useLocation();
        const history = useNavigate()
        const [homework, setHomework] = useState("")

        function changeMark(index, e) {
            setStudentsForTable(studentsForTable.map((obj, i) => {
                if (index === i) {
                    if ([1, 2, 3, 4, 5].indexOf(Number(e.target.value)) !== -1 || e.target.value === "") {
                        obj.mark = e.target.value
                    }
                }
                return obj
            }))
        }

        function changeAttendance(e, idx) {
            setStudentsForTable(studentsForTable.map((obj, i) => {
                if (idx === i) {
                    obj.attendance = e.target.value
                }
                return obj
            }))
        }

        function exit() {
            history(JOURNAL_PAGE_ROUTE, {
                state: {
                    subject: dataAboutLesson.state.subject,
                    group: dataAboutLesson.state.group,
                    month: dataAboutLesson.state.month
                }
            })
        }

        function saveDay() {
            let localMarks = {}
            for (let i = 0; i < studentsForTable.length; i++) {
                let r = String(studentsForTable[i].id)
                localMarks[r] = {
                    mark: studentsForTable[i].mark === "" ? null : studentsForTable[i].mark,
                    attendance: studentsForTable[i].attendance === "" ? null : studentsForTable[i].attendance
                }
            }
            postDayJournal(dataAboutLesson.state.date,
                dataAboutLesson.state.order,
                localMarks,
                dataAboutLesson.state.group.id,
                homework,
                dataAboutLesson.state.subject.id,
            ).then(_ => {
                success("Урок добавлен.")
            }).catch(_ => {
                error("Не удалось сохранить урок.")
            })
        }

        useEffect(() => {
            let localStudents = []
            getDayFromJournal(dataAboutLesson.state.group.id, dataAboutLesson.state.subject.id, dataAboutLesson.state.date, dataAboutLesson.state.order).then(data => {
                for (let i = 0; i < dataAboutLesson.state.students.length; i++) {
                    localStudents.push({
                        id: dataAboutLesson.state.students[i].id,
                        name: dataAboutLesson.state.students[i].firstName + " " + dataAboutLesson.state.students[i].lastName,
                        mark: data.data.marks[dataAboutLesson.state.students[i].id] !== undefined ? data.data.marks[dataAboutLesson.state.students[i].id].mark === null ? "" : data.data.marks[dataAboutLesson.state.students[i].id].mark : "",
                        attendance: data.data.marks[dataAboutLesson.state.students[i].id] !== undefined ? data.data.marks[dataAboutLesson.state.students[i].id].attendance === null ? "" : data.data.marks[dataAboutLesson.state.students[i].id].attendance : ""
                    })
                }
                setHomework(data.data.homework === undefined ? "" : data.data.homework)
                setStudentsForTable(localStudents)
            }).catch(_ => {
                for (let i = 0; i < dataAboutLesson.state.students.length; i++) {
                    localStudents.push({
                        id: dataAboutLesson.state.students[i].id,
                        name: dataAboutLesson.state.students[i].firstName + " " + dataAboutLesson.state.students[i].lastName,
                        mark: "",
                        attendance: ""
                    })
                }
                setStudentsForTable(localStudents)
            })
        }, [])
        const columns = React.useMemo(() => studentsForTable[0] ? Object.keys(studentsForTable[0]).filter(key => key !== "id").map((key, idx) => {
            if (idx === 0) {
                return {
                    Header: "Ученик",
                    accessor: key
                }
            } else if (idx === 1) {
                return {
                    Header: "оценка",
                    accessor: key
                }
            } else {
                return {
                    Header: "Посещение",
                    accessor: key
                }
            }
        }) : [], [studentsForTable])

        const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
            columns,
            data: studentsForTable
        })
        return (
            <div>
                <Card style={{width: 200, height: 100}} className={"p-1 ms-4 mt-3"}>
                    <Stack direction="vertical">
                        <div>Дата: {dataAboutLesson.state.date} </div>
                        <div> Предмет: {dataAboutLesson.state.group.label} </div>
                        <div>Урок: {dataAboutLesson.state.subject.label} </div>
                        <div>Урок: {dataAboutLesson.state.order} </div>
                    </Stack>
                </Card>
                <div className="page">
                    {studentsForTable.length !== 0 ?
                        <div>
                            <Button className="mb-3" onClick={saveDay}>Сохранить</Button>
                            <Button className="ms-3 mb-3" onClick={exit}>Вернуться обратно</Button>
                            <Stack direction="horizontal" gap={2}>
                                <table className="dayTable" {...getTableProps()}>
                                    <thead>
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => {
                                                return <th  {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            })}
                                        </tr>
                                    ))}
                                    </thead>
                                    <tbody {...getTableBodyProps()}>
                                    {
                                        rows.map((row, idx) => {
                                            prepareRow(row)
                                            return (
                                                <tr {...row.getRowProps()}>
                                                    {row.cells.map((cell, idx2) => {
                                                        if (idx2 === 0) {
                                                            return <td {...cell.getCellProps()}>
                                                                {cell.render("Cell")}
                                                            </td>
                                                        } else if (idx2 === 1) {
                                                            let dis = row.cells[2].render("Cell").props.value !== ""
                                                            return <td {...cell.getCellProps()}>
                                                                <input className="dayMark"
                                                                       disabled={dis}
                                                                       value={cell.render("Cell").props.value}
                                                                       onChange={e => changeMark(idx, e)}/>
                                                            </td>
                                                        } else if (idx2 === 2) {
                                                            let dis = row.cells[1].render("Cell").props.value !== ""
                                                            return <td {...cell.getCellProps()}>
                                                                <Form.Select
                                                                    disabled={dis}
                                                                    onChange={e => changeAttendance(e, idx)}>
                                                                    <option value={""}>{""}</option>
                                                                    {Object.keys(AttendanceEnum).map(attendance => (
                                                                        <option key={attendance}
                                                                                value={attendance}
                                                                                selected={AttendanceEnum[cell.render("Cell").props.value] === AttendanceEnum[attendance]}
                                                                        >{AttendanceEnum[attendance]}</option>
                                                                    ))
                                                                    }
                                                                </Form.Select>
                                                            </td>
                                                        }
                                                    })}
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                                <Card style={{width: 400, height: 160}} className={"p-1 ms-4"}>
                                    <Form className="hw">
                                        <Form.Group className="mb-3">
                                            <Form.Label>Домашнее задание</Form.Label>
                                            <Form.Control as="textarea" className="textSpace" value={homework}
                                                          onChange={e => setHomework(e.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                </Card>
                            </Stack>
                            <ToastContainer/>
                        </div> :
                        <div/>
                    }
                </div>
            </div>
        )
            ;
    }
;

export default DayJournalPage;