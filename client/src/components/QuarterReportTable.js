import React, {useEffect, useState} from 'react';
import {getReport} from "../http/ItemAPI";
import {useTable} from "react-table";
import "../pages/parentOrStudentPages/QuarterReport.css"

const QuarterReportTable = ({childId = null, currentQuarter = null, changeQuarters: changeQuarters, changeQuart}) => {
    const [subjectsWithMarks, setSubjectsWithMarks] = useState([])
    const [marksColumns, setMarksColumns] = useState([])

    function returnQuarter(data) {
        let localQuarters = []
        for (let i = 0; i < data.data.availableQuarters.length; i++) {
            localQuarters.push({
                label: data.data.availableQuarters[i].number,
                value: data.data.availableQuarters[i].number
            })
        }
        changeQuarters(localQuarters)
    }

    useEffect(() => {
        getReport(childId?.value, currentQuarter).then(data => {
            let localSubjectsWithMarks = []
            let marksForTable = []
            returnQuarter(data)
            Object.keys(data.data.items).map((key, idx) => {
                if (idx === 0) {
                    Object.keys(data.data.items[key]).map((keyInSubject) => {
                        if (keyInSubject === "marksCount") {
                            Object.keys(data.data.items[key][keyInSubject]).map(number => {
                                marksForTable.push({Header: number, accessor: `marks[${number}]`})
                            })
                        }
                    })
                }
                localSubjectsWithMarks.push({
                    subject: key,
                    marks: data.data.items[key].marksCount,
                    averageMark: data.data.items[key].averageMark
                })
            })
            changeQuart({label: data.data.selectedQuarter.number, value: data.data.selectedQuarter.number})
            setMarksColumns(marksForTable)
            setSubjectsWithMarks(localSubjectsWithMarks)
        })
    }, [childId, currentQuarter])
    const columns = React.useMemo(() => subjectsWithMarks[0] ? Object.keys(subjectsWithMarks[0]).map((key) => {
        if (key === "subject") {
            return {
                Header: "Предмет",
                columns: [{
                    Header: "",
                    accessor: key
                }]
            }
        } else if (key === "marks") {
            return (
                {
                    Header: "Количество оценок",
                    columns: marksColumns
                }
            )
        } else {
            return (
                {
                    Header: "Средняя оценка",
                    columns: [{
                        Header: "",
                        accessor: key
                    }]
                }
            )
        }
    }) : [], [subjectsWithMarks])
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable({
        columns: columns,
        data: subjectsWithMarks
    })
    return (
        subjectsWithMarks.length === 0 ?
            <div>Недостаточно данных для отчета.</div>
            :
            <table className="journal" {...getTableProps}>
                <thead>
                {headerGroups.map((headerGroup, idx) => (
                    <tr{...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, idx2) => {
                            if (idx === 0 && idx2 === 0 || idx === 0 && idx2 === 2) {
                                return <th rowSpan="2" {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            } else if (idx === 1 && idx2 === 0) {
                                return null
                            } else if (idx === 1 && idx2 === 6) {
                                return null
                            } else if (idx === 0 && idx2 === 1) {
                                return <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            } else {
                                return <th className="ThWithoutHover" {...column.getHeaderProps()}>
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
                            <tr{...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
    );
};

export default QuarterReportTable;