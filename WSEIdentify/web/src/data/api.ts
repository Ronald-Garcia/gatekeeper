import { API_URL } from "@/env";
import { BudgetType, MachineType, UserType } from "./types";

export const getUserByJID = async (userID: number) => {
    try {
        const result = await fetch(`${API_URL}/users/${userID}`);
        if (result.status === 404) {
            throw new Error("User is not registered. Please see an admin.");
        } else if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }
        const data: UserType = await result.json();
        console.log(data);

        data.budgetCodes = Object.values(data.budgetCodes);
        return data;    
    } catch (err) {
        throw err;
    }
}

export const addUserToDB = async (newUser: UserType) => {
    
    try {
        const result = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        });
        

        if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }

        const data = await result.json();
        return data;
    } catch (err) {
        throw err;
    }

}

export const getAllAvailableMachines = async () => {

    try {
        const result = await fetch(`${API_URL}/machines`);
        if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }
        const data: MachineType[] = await result.json();
        return data;
    } catch (err) {
        throw err;
    }
}


export const getAllBudgetCodes = async () => {

    try {
        const result = await fetch(`${API_URL}/budgets`);

        if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }

        const data: BudgetType[] = await result.json();
        return data;
    } catch (err) {
        throw err;
    }
}

