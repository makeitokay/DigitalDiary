import React, {useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import {getGroupsAndSubjectsForJournal, getJournal, getStudentsByGroup} from "../http/ItemAPI";
import Select from "react-select";
import {MonthEnum} from "../store/MonthEnum";
import {Stack} from "react-bootstrap";
import "./JournalPage.css"
import {AttendanceEnum} from "../store/AttendanceEnum";
import {useTable} from "react-table";
import {useLocation, useNavigate} from "react-router-dom";
import {DAY_JOURNAL} from "../utils/Const";

const JournalPage = () => {
    const [subject, setSubject] = useState("")
    const [group, setGroup] = useState("")
    const [month, setMonth] = useState("")
    const [availableGroupsAndSubjects, setAvailableGroupsAndSubjects] = useState([])
    const [availableMonths, setAvailableMonths] = useState([])
    const [journal, setJournal] = useState([])
    const [students, setStudents] = useState([])
    const [studentsForTable, setStudentsForTable] = useState([])
    const [marksColumns, setMarksColumns] = useState([])
    const [currentSubjectAndGroup, setCurrentSubjectAndGroup] = useState({group: null, subject: null})
    const history = useNavigate()
    const DataFromDayJournal = useLocation()
    const [preloading, setPreloading] = useState(false)

    function chooseGroupAndSubject(e) {
        let stringGroupAndSubject = e.label.split(", ")
        setCurrentSubjectAndGroup({group: stringGroupAndSubject[1], subject: stringGroupAndSubject[0]})
        setGroup(e.value.group)
        setSubject(e.value.subject)
        if (month !== "") {
            getJournal(e.value.group, e.value.subject, month).then(data => {
                setJournal(data.data)
            })
            getStudentsByGroup(e.value.group).then(data => {
                setStudents(data.data)
            })
        }
    }

    function chooseMonth(e) {
        setMonth(e.value)
        if (group !== "" && subject !== "") {
            getJournal(group, subject, e.value).then(data => {
                setJournal(data.data)
            })
            getStudentsByGroup(group).then(data => {
                setStudents(data.data)
            })
        }
    }

    function chooseDay(order) {
        history(DAY_JOURNAL, {
            state: {
                group: {id: group, label: currentSubjectAndGroup.group},
                subject: {id: subject, label: currentSubjectAndGroup.subject},
                date: journal[order - 1].date,
                order: journal[order - 1].order,
                students: students, month: month
            }
        })
    }

    useEffect(() => {
        if (DataFromDayJournal.state !== null) {
            getJournal(DataFromDayJournal.state.group.id, DataFromDayJournal.state.subject.id, DataFromDayJournal.state.month).then(data => {
                setJournal(data.data)
            })
            getStudentsByGroup(DataFromDayJournal.state.group.id).then(data => {
                setStudents(data.data)
            })
            setPreloading(false)
        }
    }, [preloading])
    useEffect(() => {
        if (DataFromDayJournal.state !== null) {
            setMonth(DataFromDayJournal.state.month)
            setSubject(DataFromDayJournal.state.subject.id)
            setGroup(DataFromDayJournal.state.group.id)
            setPreloading(true)
            setCurrentSubjectAndGroup({
                group: DataFromDayJournal.state.group.label,
                subject: DataFromDayJournal.state.subject.label
            })
        }
        Array.from({length: 13}).map((_, idx) => {
            if (idx === 0 || idx === 6 || idx === 7 || idx === 8) {
            } else {
                availableMonths.push({label: MonthEnum[String(idx)], value: idx})
            }
        })
        getGroupsAndSubjectsForJournal().then(data => {
            let localGroupsAndSubjects = []
            for (let i = 0; i < data.data.length; i++) {
                localGroupsAndSubjects.push({
                    value: {group: data.data[i].groupId, subject: data.data[i].subjectId},
                    label: data.data[i].name
                })
            }
            setAvailableGroupsAndSubjects(localGroupsAndSubjects)
        })
    }, [])
    useEffect(() => {
        if (students.length !== 0 && journal.length !== 0) {
            let localDataForTable = []
            let localMarksColumns = []
            for (let j = 0; j < students.length; j++) {
                let marks = new Array(journal.length).fill(" ")
                for (let i = 0; i < journal.length; i++) {
                    if (journal[i].marks === null) {
                        marks[i] = ""
                    } else {
                        if (journal[i].marks[students[j].id] !== undefined) {
                            if (AttendanceEnum[journal[i].marks[students[j].id]] === undefined) {
                                marks[i] = journal[i].marks[students[j].id]
                            } else {
                                marks[i] = AttendanceEnum[journal[i].marks[students[j].id]]
                            }
                        }
                    }
                }
                localDataForTable.push({name: students[j].firstName + " " + students[j].lastName, marks: marks})
            }
            for (let i = 0; i < journal.length; i++) {
                localMarksColumns.push({
                    Header: journal[i].date.substring(journal[i].date.length - 2),
                    accessor: `marks[${i}]`
                })
            }
            setMarksColumns(localMarksColumns)
            setStudentsForTable(localDataForTable)
        }
    }, [journal, students])
    const column = React.useMemo(() => studentsForTable[0] ? Object.keys(studentsForTable[0]).map((key) => {
        if (key === "marks") {
            return {
                Header: String(MonthEnum[month]),
                columns: marksColumns
            }
        } else {
            return {
                Header: "Ученик",
                columns: [{
                    Header: "",
                    accessor: key
                }]
            }
        }
    }) : [], [studentsForTable])
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
        columns: column,
        data: studentsForTable
    })
    return (
        <div className="page">
            <Form className="mb-3">
                <Stack direction="horizontal" gap={3}>
                    <Form.Group>
                        <Form.Label>Выберите класс и предмет.</Form.Label>
                        <Select options={availableGroupsAndSubjects} defaultValue={
                            {
                                label: DataFromDayJournal.state !== null ? DataFromDayJournal.state?.subject.label + ", " + DataFromDayJournal.state?.group.label : null,
                                value: {
                                    group: DataFromDayJournal.state?.group.id,
                                    subject: DataFromDayJournal.state?.subject.id
                                }
                            }
                        }
                                onChange={chooseGroupAndSubject}></Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Выберите месяц.</Form.Label>
                        <Select options={availableMonths} onChange={chooseMonth} defaultValue={
                            {label: MonthEnum[DataFromDayJournal.state?.month], value: DataFromDayJournal.state?.month}
                        }></Select>
                    </Form.Group>
                </Stack>
            </Form>
            <div className="App">
                {studentsForTable.length !== 0 ?
                    <div className="App">
                        <div>
                            <table className="journal" {...getTableProps()}>
                                <thead>
                                {headerGroups.map((headerGroup, idx) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column, idx2) => {
                                            if (idx === 0 && idx2 === 0) {
                                                return <th rowSpan="2" className="topThL" {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            } else if(idx === 0 && idx2 ===  1){
                                                return <th rowSpan="1" className="topThF" {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            } else if (idx === 1 && idx2 === 0) {
                                                return null
                                            } else {
                                                return <th className="Th"
                                                    onClick={event => chooseDay(idx2)} {...column.getHeaderProps()}>
                                                    {column.render("Header")}
                                                </th>
                                            }
                                        })}
                                    </tr>
                                ))}
                                </thead>
                                <tbody {...getTableBodyProps()}>
                                {
                                    rows.map((row) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, idx) => {
                                                    if (idx === 0) {
                                                        return <td className="name" {...cell.getCellProps()}>
                                                            {cell.render("Cell")}
                                                        </td>
                                                    } else {
                                                        return <td {...cell.getCellProps()}>
                                                            {cell.render("Cell")}
                                                        </td>
                                                    }
                                                })}
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div> : <div/>
                }
            </div>
        </div>
    )
        ;
};

export default JournalPage;