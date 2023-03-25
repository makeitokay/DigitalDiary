import React from 'react';
import {Tab, Tabs} from "react-bootstrap";
import AddGroups from "./settingPages/AddGroups";
import AddUser from "./settingPages/AddUser";
import {ToastContainer} from "react-toastify";

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
                </Tab>
                <Tab eventKey="contact" title="Настройка рассписания">
                </Tab>
            </Tabs>
            <ToastContainer/>
        </div>
    );
};

export default SettingPage;