import {$authHost} from "./Index";

export const getAllGroups = async (letter, number) => {
        await $authHost.post('groups', {letter, number});
}