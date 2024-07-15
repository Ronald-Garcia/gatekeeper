import { API_URL } from "@/env";
import { BudgetType, RelationType, MachineType, UserType } from "./types";

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

export const removeUserByJID = async (userID: number) => {
    try {
        const result = await fetch(`${API_URL}/users/${userID}`,
            {
                method: "DELETE"
            }
        );

        if (result.status === 400) {
            throw new Error("Student was bad, likely not an existing student. To add a student, use the Add Student action.");
        } else if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }
        const data: UserType = await result.json();
        
        if (!data || Object.keys(data).includes("message")) {
            throw new Error("Student was bad, likely not an existing student. To add a student, use the Add Student action.");
        }

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

        if (!result.ok) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }

        const data = await result.json();

        if (Object.keys(data).includes("message")) {
            throw new Error("Student was bad, likely not a unique student. To edit a student, use the Update Student action.");
        }

        return data;
    } catch (err) {
        throw err;
    }

}

export const updateUserToDB = async (user: UserType) => {
    try {
        const result = await fetch(`${API_URL}/users/${user.jid}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        

        if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }

        const data = await result.json();

        if (Object.keys(data).includes("message")) {
            throw new Error("Student was bad, likely not a unique student. Make sure the ID being edited to is unique.");
        }
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


export const addBudgetToDB = async (budget: BudgetType) => {

    try {
        const result = await fetch(`${API_URL}/budgets`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(budget)    
            }
        );

        if (!result.ok) {
            throw new Error("Budget was not successfully added. Please double check the fields and try again.");
        }



        const data: BudgetType = await result.json();

        if (Object.keys(data).includes("message")) {
            throw new Error("Budget was bad, likely not a unique budget. To edit a budget, delete the old budget and add it again.");
        }
        return data;
    } catch (err) {
        throw err;
    }
}

export const getBudgetByID = async (budgetID: number) => {

    try {
        const result = await fetch(`${API_URL}/budgets/${budgetID}`);

        if (!result.ok) {
            throw new Error("Budget does not exist");
        }

        const data: BudgetType = await result.json();
        return data;

    } catch (err) {
        throw err;
    }
}


export const removeBudgetByID = async (budgetID: number) => {

    try {
        const result = await fetch(`${API_URL}/budgets/${budgetID}`, { method: "DELETE" });

        if (result.status === 400) {
            throw new Error("Budget was bad, likely not an existing budget. To add a budget, use the Add Budget action.");
        } else if (result.status === 500) {
            throw new Error("Something unexpected happened. Please notify an admin and try again later.");
        }
        const data: UserType = await result.json();
        
        if (!data || Object.keys(data).includes("message")) {
            throw new Error("Budget was bad, likely not an existing budget. To add a budget, use the Add Budget action.");
        }

        return data;    
    } catch (err) {
        throw err;
    }
}

export const getBudgetsFromUser = async (userID: number) => {

    try {
        const result = await fetch(`${API_URL}/users/${userID}/budgets`);

        if (!result.ok) {
            throw new Error("Error");
        }

        const data: BudgetType[] = await result.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export const createRelation = async (userID: number, budgetID: number) => {
    try {

        console.log(JSON.stringify({ userId: userID, budgetId: budgetID }));
        const result = await fetch(`${API_URL}/users/budgets`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userID, budgetId: budgetID }) 
            }
        );

        if (!result.ok) { 
            throw new Error("Request was bad, likely because either the budget or user do not exist.");
        }

        const data: RelationType = await result.json();
        return data;
    } catch (err) { 
        throw err;
    }
}


export const deleteRelation = async (userID: number, budgetID: number) => {
    try {
        const result = await fetch(`${API_URL}/users/${userID}/budgets/${budgetID}`,
            {
                method: "DELETE"
            }
        );

        if (!result.ok) { 
            throw new Error("Request was bad, likely because either the budget or user do not exist.");
        }

        const data: RelationType = await result.json();
        return data;
    } catch (err) { 
        throw err;
    }
}

