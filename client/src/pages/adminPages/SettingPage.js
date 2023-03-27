import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import AddGroups from "./settingPages/AddGroups";
import AddUser from "./settingPages/AddUser";
import {ToastContainer} from "react-toastify";
import AddSubject from "./settingPages/AddSubject";
import SettingSchedule from "./settingPages/SettingSchedule";

const SettingPage = () => {
    return (
        <div>
            <Tabs
                defaultActiveKey="profile"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="home" title="Добавление пользователя">
                    <AddUser/>
                </Tab>
                <Tab eventKey="profile" title="Добавление класса">
                    <AddGroups/>
                </Tab>
                <Tab eventKey="longer-tab" title="Добавление предмета">
                    <AddSubject/>
                </Tab>
                <Tab eventKey="contact" title="Настройка рассписания">
                    <SettingSchedule/>
                </Tab>
            </Tabs>
            <ToastContainer/>
        </div>
    );
};

export default SettingPage;