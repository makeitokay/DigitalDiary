import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../../src/pages/commonPages/announcementPagesByRole/Announcement.css';
import {getAllAnnouncement, getAnnouncement} from "../../http/ItemAPI";
import "./Modal.css";
import {Stack} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AddAnnouncementModal from "./AddAnnouncementModal";
import {RoleEnum} from "../../store/RoleEnum";
import Form from 'react-bootstrap/Form';

const Announcements = ({role}) => {
    const [announcements, setAnnouncements] = useState([])
    const [showAddModal, setShowAddModal] = useState(false)
    const [reload, setReload] = useState(false)
    const [showAllAnnouncements, setShowAllAnnouncements] = useState(false)

    function Announcement({announcement}) {
        return (
            <div>
                <Card className="announcement">
                    <Card.Body>
                        <Card.Title>{announcement?.header}</Card.Title>
                        <Card.Text>
                            {announcement?.text}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Row justify="flex-end">
                            <Stack direction="horizontal" gap={3}>
                                <small className="text-muted">{announcement?.authorName}</small>
                                <small className="date">{announcement?.createdAtUtc}</small>
                            </Stack>
                        </Row>
                    </Card.Footer>
                </Card>
            </div>
        )
    }

    function readAnnouncements(e) {
        if (e.target.value === "true") {
            setShowAllAnnouncements(true);
        } else {
            setShowAllAnnouncements(false);
        }
        setReload(true);
    }

    function addAnnouncement(e) {
        setReload(e)
    }

    useEffect(() => {
        if (showAllAnnouncements) {
            getAllAnnouncement().then(data => {
                setAnnouncements(data.data.reverse())
            })
        } else {
            getAnnouncement().then(data => {
                setAnnouncements(data.data.reverse())
            })
        }
        setReload(false)
    }, [reload])
    return (
        <div>
            {announcements.length === 0 && role !== RoleEnum.Teacher && role !== RoleEnum.SchoolAdmin ?
                <div>Объявлений нет</div>
                :
                <div/>
            }
            <div className="child">
                {(role === RoleEnum.Teacher || role === RoleEnum.SchoolAdmin) ?
                    <Button className="button" onClick={() => setShowAddModal(true)}>Создать объявление</Button> :
                    <div/>
                }
                {role === RoleEnum.SchoolAdmin ?
                    <Form.Select onChange={readAnnouncements} className="select">
                        <option value={"false"}>Объявления для администраторов</option>
                        <option value={"true"}>Все объявления</option>
                    </Form.Select>
                    :
                    <div/>
                }
                <div>
                    {announcements.length === 0 && (role === RoleEnum.Teacher || role === RoleEnum.SchoolAdmin) ?
                        <div>Объявлений нет</div>
                        :
                        <Row xs={1} md={1} className="g-4">
                            {Array.from({length: announcements.length}).map((_, idx) => (
                                <div key={idx}>
                                    <Col>
                                        <Announcement announcement={announcements[idx]}/>
                                    </Col>
                                </div>
                            ))}
                        </Row>}
                    {role === RoleEnum.Teacher || role === RoleEnum.SchoolAdmin ?
                        <AddAnnouncementModal show={showAddModal} close={() => setShowAddModal(false)}
                                              reload={addAnnouncement}/>
                        : <div/>
                    }
                </div>
                <div>
                    {showAllAnnouncements}
                </div>
            </div>
        </div>
    );
};

export default Announcements;