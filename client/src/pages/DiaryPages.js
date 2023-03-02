import React, {useContext} from 'react';
import {UserContext} from "../index";

const DiaryPages = () => {
    const {user,userState} = useContext(UserContext)
    console.log("Diary")
    console.log(user)
    return (
        <div>
            БЛЯЯЯЯ
        </div>
    );
};

export default DiaryPages;