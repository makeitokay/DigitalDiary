import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import AddClass from "./settingPages/AddClass";

const SettingPage = () => {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="home" title="Добавление пользователя">

            </Tab>
            <Tab eventKey="profile" title="Добавление класса">
                <AddClass/>
            </Tab>
            <Tab eventKey="longer-tab" title="Добавление предмета">
            </Tab>
            <Tab eventKey="contact" title="Настройка рассписания">
            </Tab>
        </Tabs>
    );
};

export default SettingPage;