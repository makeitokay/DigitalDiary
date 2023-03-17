import {$authHost} from "./Index";

export const getAllClasses = async (letter, number) => {
        await $authHost.post('groups', {letter, number});
}