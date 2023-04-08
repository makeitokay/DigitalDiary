import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import "./Modal.css";
import {Card, CloseButton} from "react-bootstrap";
import Row from "react-bootstrap/Row";

const Modal = ({close, announcement = null, show}) => {
    const closeOnEscapeKeyDown = e => {
        if ((e.charCode || e.keyCode) === 27) {
            close();
        }
    };

    function RenderAnnouncement() {
        return (
            <div className="modal" onClick={close}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <CloseButton onClick={close}/>
                    <Card border="light">
                        <Card.Body>
                            <Card.Title>{announcement.header}</Card.Title>
                            <Card.Text>
                                {announcement.text}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Row justify="flex-end">
                                <small className="text-muted">{announcement.authorName}</small>
                                <small className="text-end">{announcement.createdAtUtc}</small>
                            </Row>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        )
    }

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <CSSTransition
            in={show}
            unmountOnExit
            timeout={{enter: 0, exit: 300}}
        >
            <RenderAnnouncement/>
        </CSSTransition>,
        document.getElementById("root")
    );
};

export default Modal;
