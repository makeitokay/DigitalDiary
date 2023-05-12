import {$adminHost, $authHost} from "./Index";

export const setGroup = async (letter, number) => {
    await $authHost.post('groups', {letter, number});
}
export const getAllGroups = async () => {
    return await $authHost.get('groups');
}
export const setStudent = async (firstName, lastName, email, letter, number) => {
    let group = {
        "letter": letter,
        "number": number
    }
    await $authHost.post('users/students', {firstName, lastName, email, group});
}
export const getAllStudents = async () => {
    return await $authHost.get('users/students');
}
export const setParent = async (firstName, lastName, email, children) => {
    await $authHost.post('users/parents', {firstName, lastName, email, children});
}
export const setTeacher = async (firstName, lastName, email) => {
    await $authHost.post('users/teachers', {firstName, lastName, email});
}
export const getAllTeacher = async () => {
    return await $authHost.get('users/teachers');
}


export const setAdmin = async (firstName, lastName, email) => {
    await $authHost.post('users/admins', {firstName, lastName, email});
}
export const setSubject = async (name) => {
    await $authHost.post('subjects', {name});
}
export const getAllSubject = async () => {
    return await $authHost.get('subjects');
}

export const getAllSchedule = async (groupId) => {
    if (groupId === undefined) {
        return null
    }
    return await $authHost.get(`schedule`, {params: {groupId: groupId}});
}
export const setSchedule = async (dayOfWeek, subjectId, teacherId, order, groupId) => {
    await $authHost.post('schedule', {dayOfWeek, subjectId, teacherId, order, groupId});
}

export const setAnnouncement = async (header, text, forGroups, forGroupParallels, forRoles) => {
    await $authHost.post('Announcements', {header, text, scope: {forGroups, forGroupParallels, forRoles}})
}
export const getAnnouncement = async () => {
    return await $authHost.get('Announcements');
}
export const getAllAnnouncement = async () => {
    return await $authHost.get('Announcements/all');
}


export const getGroupsAndSubjectsForJournal = async () => {
    return await $authHost.get('journal/subjects-groups');
}

export const getJournal = async (groupId, subjectId, month) => {
    return await $authHost.get(`journal`, {params: {groupId: groupId, subjectId: subjectId, month: month}});
}


export const getStudentsByGroup = async (groupId) => {
    return await $authHost.get(`groups/${groupId}/students`)
}

export const getDayFromJournal = async (groupId, subjectId, date, order) => {
    return await $authHost.get('journal/lesson', {
        params: {
            groupId: groupId,
            subjectId: subjectId,
            date: date,
            order: order
        }
    })
}
export const postDayJournal = async (date, order, marks, groupId, homework, subjectId) => {
    await $authHost.post('journal/lesson', {date, order, marks, groupId, homework, subjectId})
}

export const getDiaryApi = async (week, childId = null) => {
    if (childId === null) {
        return await $authHost.get('diary', {params: {week: week}})
    }
    return await $authHost.get('diary', {params: {childId: childId, week: week}})
}
export const getChildren = async () => {
    return await $authHost.get('diary/children')
}

export const getReport = async (childId = null, quarter = null) => {
    return await $authHost.get('reports', {params: {childId: childId, quarter: quarter}})
}


export const getStatisticMarks = async (groupId = null, teacherId = null, subjectId = null, start = null, end = null) => {
    return await $authHost.get('statistics/marks', {
        params: {
            group: groupId,
            teacher: teacherId,
            subject: subjectId,
            start: start,
            end: end
        }
    })
}
export const getStatisticAttendance = async (groupId = null, attendance = null, start, end) => {
    return await $authHost.get('statistics/attendance', {
        params: {
            groupId: groupId,
            attendance: attendance,
            start: start,
            end: end
        }
    })
}

export const createSchool = async (schoolName, schoolCity, creatorEmail, creatorFirstName, creatorLastName) => {
    await $adminHost.post('school-request/create', {
        schoolName,
        schoolCity,
        creatorEmail,
        creatorFirstName,
        creatorLastName
    })
}