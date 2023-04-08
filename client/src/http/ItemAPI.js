import {$authHost} from "./Index";

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

