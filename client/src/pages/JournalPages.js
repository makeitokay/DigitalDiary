import React, {useContext} from 'react';
import {UserContext} from "../index";

const JournalPages = () => {
    const {user, userState} = useContext(UserContext)
    console.log("Diary")
    return (
        <div>
            Страница дневника
        </div>
    );
};

export default JournalPages;