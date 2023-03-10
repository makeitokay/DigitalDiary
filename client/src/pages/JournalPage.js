import React, {useContext} from 'react';
import {UserContext} from "../index";

const JournalPage = () => {
    const {user, userState} = useContext(UserContext)
    console.log("Diary")
    return (
        <div>
            Страница журнала
        </div>
    );
};

export default JournalPage;