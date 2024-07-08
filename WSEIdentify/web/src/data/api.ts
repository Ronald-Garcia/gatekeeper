import { API_URL } from "@/env";
import { UserType } from "./types";

export const getUserByJID = async (userID: number) => {
    try {
        const result = await fetch(`${API_URL}/users/${userID}`);
        if (result.status === 404) {
            throw new Error("User is not registered. Please see an admin.");
        } else if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }
        const data: UserType = await result.json();
        return data;    
    } catch (err) {
        throw err;
    }
}

