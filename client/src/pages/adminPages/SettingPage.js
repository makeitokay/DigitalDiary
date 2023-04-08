import React from 'react';
import {Row, Tab} from "react-bootstrap";
import AddGroups from "./settingPages/AddGroups";
import AddUser from "./settingPages/AddUser";
import SettingSchedule from "./settingPages/SettingSchedule";
import AddSubject from "./settingPages/AddSubject";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "./Settings.css"

const SettingPage = () => {
    return (
        <div className="page">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3} className="menu">
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="home">Добавление пользователя</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="profile">Добавление класса</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="longer-tab">Добавление предмета</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="contact">Настройка рассписания</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="home">
                                <AddUser/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="profile">
                                <AddGroups/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="longer-tab">
                                <AddSubject/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="contact">
                                <SettingSchedule/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default SettingPage;