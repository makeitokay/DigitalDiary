import React, {useContext} from 'react';
import {UserContext} from "../../index";
import Announcements from "../../components/announcementComponents/Announcements";
import {ToastContainer} from "react-toastify";

const AnnouncementPage = () => {
    const {user, setUser} = useContext(UserContext)

    function AnnouncementPageByRole() {
        if (user === undefined) {
            return <div/>
        }
        return <Announcements role={user.role}/>
    }

    return (
        <div className="parent">
            <AnnouncementPageByRole/>
            <ToastContainer/>
        </div>
    );
};

export default AnnouncementPage;