import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../../src/pages/commonPages/announcementPagesByRole/Announcement.css';
import {getAnnouncement} from "../../http/ItemAPI";
import Modal from "./Modal";
import Button from "react-bootstrap/Button";
import AddAnnouncementModal from "./AddAnnouncementModal";
import {Stack} from "react-bootstrap";
import {RoleEnum} from "../../store/RoleEnum";

const Announcements = ({role}) => {
    const [announcements, setAnnouncements] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [modalAnnouncement, setModalAnnouncement] = useState(undefined)
    const [reload, setReload] = useState(false)

    function Announcement({announcement, onClick}) {
        function click() {
            onClick()
            setModalAnnouncement(announcement)
        }

        return (
            <div onClick={click}>
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

    function addAnnouncement(e) {
        setReload(e)
    }

    useEffect(() => {
        getAnnouncement().then(data => {
            setAnnouncements(data.data.reverse())
        })
        setReload(false)
    }, [reload])
    return (
        <div className="child">
            {(role === RoleEnum.Teacher || role === RoleEnum.SchoolAdmin) ?
                <Button className="button" onClick={() => setShowAddModal(true)}>Добавить новость</Button> :
                <div/>
            }
            <div>
                <Row xs={1} md={1} className="g-4">
                    {Array.from({length: announcements.length}).map((_, idx) => (
                        <div key={idx}>
                            <Col>
                                <Announcement announcement={announcements[idx]} onClick={() => setShowModal(true)}/>
                            </Col>
                        </div>
                    ))}
                </Row>
                <Modal show={showModal} close={() => setShowModal(false)} announcement={modalAnnouncement}/>
                <AddAnnouncementModal show={showAddModal} close={() => setShowAddModal(false)}
                                      reload={addAnnouncement}/>
            </div>
        </div>
    );
};

export default Announcements;