import React, {useEffect, useState} from 'react';
import {
    Accordion, CloseButton, OverlayTrigger, Tooltip
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import Button from "react-bootstrap/Button";
import '../../pages/commonPages/announcementPagesByRole/Announcement.css'
import {RoleEnum} from "../../store/RoleEnum";
import {getAllGroups, setAnnouncement} from "../../http/ItemAPI";
import {error, success} from "../Notifications";
import '../../../src/pages/commonPages/announcementPagesByRole/Announcement.css';
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";


const AddAnnouncementModal = ({close, show, reload}) => {
    const [availableParallels, setAvailableParallels] = useState([])
    const [header, setHeader] = useState("")
    const [text, setText] = useState("")
    const [availableGroups, setAvailableGroups] = useState([])
    const [availableUserRoles, setAvailableUserRoles] = useState([
        {value: RoleEnum.Teacher, label: "учитель"},
        {value: RoleEnum.SchoolAdmin, label: "администратор"},
        {value: RoleEnum.Parent, label: "родитель"},
        {value: RoleEnum.Student, label: "ученик"}])
    const [parallels, setParallels] = useState([])
    const [userRoles, setUserRoles] = useState([])
    const [groups, setGroups] = useState([])

    function addGroups(groupsBySelect) {
        let localGroups = []
        for (let i = 0; i < groupsBySelect.length; i++) {
            localGroups.push(groupsBySelect[i].value)
        }
        setGroups(localGroups)
    }

    function addParallels(parallelsBySelect) {
        let localParallels = []
        for (let i = 0; i < parallelsBySelect.length; i++) {
            localParallels.push(parallelsBySelect[i].value)
        }
        setParallels(localParallels)
    }

    function addUserRole(userRolesBySelect) {
        let localUserRoles = []
        for (let i = 0; i < userRolesBySelect.length; i++) {
            localUserRoles.push(userRolesBySelect[i].value)
        }
        setUserRoles(localUserRoles)
    }

    function addAnnouncement() {
        if (header === "" || text === "" || (groups.length === 0 && userRoles.length === 0 && parallels.length === 0)) {
            error("Заполните все необходимые данные.")
            return
        }
        setAnnouncement(header, text, groups, parallels, userRoles).then(() => {
            success("Объявление добавлено.")
        }).catch(function (_) {
            error("Не удалось добавить объявление.")
        })
        reload(true)
        close()
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Не обязательно заполнять все поля.
        </Tooltip>
    );

    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            close();
            reload(true)
        }
    };

    function closeModal() {
        setHeader("")
        setGroups([])
        setText("")
        setParallels([])
        setUserRoles([])
        reload(true)
        close()
    }

    useEffect(() => {
        getAllGroups().then(data => {
                let localGroups = []
                for (let i = 0; i < data.data.length; i++) {
                    localGroups.push({value: data.data[i].id, label: data.data[i].number + data.data[i].letter})
                }
                setAvailableGroups(localGroups.sort((x, y) => x.label > y.label ? 1 : x.label === y.label ? 0 : -1))
                let localParallels = []
                for (let i = 0; i < 11; i++) {
                    localParallels.push({label: i + 1, value: i + 1})
                }
                setAvailableParallels(localParallels)
            }
        )
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, [])

    return ReactDOM.createPortal(
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{enter: 0, exit: 300}}
        >
            <div className="modal" onClick={closeModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <CloseButton onClick={closeModal}/>
                    <div className="a">
                        <h4 className="mb-3">
                            Создание объявления
                        </h4>
                        <Accordion className="mb-3" defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header defaultValue={"slfksdl;fds"}>
                                    {header === "" ? "Заголовок." : header}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Form.Control className="mb-3" placeholder="Введите заголовoк." value={header}
                                                  onChange={e => setHeader(e.target.value)}/>
                                    <Form.Control className="text" as="textarea" value={text}
                                                  placeholder="Введите текст."
                                                  onChange={e => setText(e.target.value)}/>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>
                                    Область видимости.
                                    <div className="overlay">
                                        <OverlayTrigger
                                            placement="left"
                                            overlay={renderTooltip}
                                        >
                                            <Button variant="success">Важно</Button>
                                        </OverlayTrigger>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div className="mb-3">

                                        Можно заполнить не все поля.
                                    </div>
                                    <Form.Group>
                                        <Form.Label>Выберите определенные классы для оповещения.</Form.Label>
                                        <Select isMulti className="mb-3" options={availableGroups}
                                                onChange={addGroups}/>
                                        <Form.Label>Выберите определенную параллель для оповещения.</Form.Label>
                                        <Select isMulti className="mb-3" options={availableParallels}
                                                onChange={addParallels}/>
                                        <Form.Label>Выберите тип пользователя для оповещения.</Form.Label>
                                        <Select isMulti className="mb-3" options={availableUserRoles}
                                                onChange={addUserRole}/>
                                    </Form.Group>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Button onClick={addAnnouncement}>Добавить</Button>
                    </div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default AddAnnouncementModal;