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
        await $authHost.post('users/students', {firstName, lastName, email,group});
}
export const getAllStudents = async () => {
        return await $authHost.get('users/students');
}
export const setParent = async (firstName, lastName, email, children) => {
        await $authHost.post('users/parents', {firstName, lastName, email,children});
}
export const setTeacher = async (firstName, lastName, email) => {
        await $authHost.post('users/teachers', {firstName, lastName, email});
}

export const setAdmin = async (firstName, lastName, email) => {
        await $authHost.post('users/admins', {firstName, lastName, email});
}