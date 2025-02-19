import { API_URL, PI_URL } from "@/env";
import { BudgetType, BudgetRelationType, MachineType, UserType, TransactionType, OverrideTransactionType, MachineRelationType } from "./types";

export const turnOnMachine = async () => {
    
}

export const getUserByJID = async (userID: number) => {
    try {
        
        const result = await fetch(`${API_URL}/users/${userID}`);

        if (result.status === 500) {
            throw new Error("Internal server error! Would you like to enable override?");
        }
        if (!result.ok) {
            const data: { message: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }

        const data: UserType = await result.json();


        return data;    
    } catch (err) {
        throw err;
    }
}

export const getUserByJHED = async (jhed: string) => {
    try {
        const result = await fetch(`${API_URL}/users/jhed/${jhed}`);

        if (result.status === 500) {
            throw new Error("Internal server error! Would you like to enable override?");
        }
        if (!result.ok) {
            const data: { message: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }
        const data: UserType = await result.json();

        return data;    
    } catch (err) {
        throw err;
    }
}

export const removeUserByJHED = async (jhed: string) => {
    try {
        const result = await fetch(`${API_URL}/users/jhed/${jhed}`,
            {
                method: "DELETE"
            }
        );

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }
        const data: UserType = await result.json();

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
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }

        const data = await result.json();

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
        

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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
        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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
        
        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
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

export const createBudgetRelation = async (userID: number, budgetID: number) => {
    try {
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
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }

        const data: BudgetRelationType = await result.json();
        return data;
    } catch (err) { 
        throw err;
    }
}


export const deleteBudgetRelation = async (userID: number, budgetID: number) => {
    try {
        const result = await fetch(`${API_URL}/users/${userID}/budgets/${budgetID}`,
            {
                method: "DELETE"
            }
        );

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }

        const data: BudgetRelationType = await result.json();
        return data;
    } catch (err) { 
        throw err;
    }
}

export const getMachinesFromUser = async (userID: number) => {

    try {
        const result = await fetch(`${API_URL}/users/${userID}/machines`);

        if (!result.ok) {
            throw new Error("Error");
        }

        const data: MachineType[] = await result.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export const createMachineRelation = async (userID: number, machineId: number) => {
    try {
        const result = await fetch(`${API_URL}/users/machines`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userID, machineId }) 
            }
        );

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }

        const data: MachineRelationType = await result.json();
        return data;
    } catch (err) { 
        throw err;
    }
}

export const deleteMachineRelation = async (userID: number, machineId: number) => {
    try {
        const result = await fetch(`${API_URL}/users/${userID}/machines/${machineId}`,
            {
                method: "DELETE"
            }
        );

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }

        const data: MachineRelationType = await result.json();
        return data;
    } catch (err) { 
        throw err;
    }
}

export const addTransactionToDB = async (t: TransactionType) => {

    const result = await fetch(`${API_URL}/transactions`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(t)
        }
    );

    if (!result.ok) {
        throw new Error("Request was bad, likely because either budget or user do not exist.");
    }

    const data: TransactionType = await result.json();
    return data;
}

export const addMachineToDB = async (name: string, rate: number) => {
    
    try {

        const result = await fetch(`${API_URL}/machines`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    rate
                })
            }
        );

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(`Something went wrong!: ${JSON.stringify(data)}`);
        }
        
        const data: MachineType = await result.json();
        return data;
    } catch (err) {
        throw err;
    }
}

export const getMachineByName = async (name: string) => {
    try {
        const result = await fetch(`${API_URL}/machines/${name}`)

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(JSON.stringify(data));
        }

        const data: MachineType = await result.json();

        return data;
    } catch (err) {
        throw err;
    }    
}

export const removeMachineByName = async (name: string) => {

    try {
        const result = await fetch(`${API_URL}/machines/${name}`,
            {
                method: "DELETE"
            }
        )

        if (!result.ok) {
            const data: { error: string } = await result.json();
            throw new Error(JSON.stringify(data));
        }

        const data: MachineType = await result.json();

        return data;
    } catch (err) {
        throw err;
    }
}

export const addAllOverrideTransactions = async (transactions: OverrideTransactionType[]) => {

    try {       
        transactions.map(async t => {
            const result = await fetch(`${API_URL}/otransactions`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(t)
                }
            )
        
            if (!result.ok) {
                const data: { error: string } = await result.json();
                throw new Error(JSON.stringify(data));
            }
    
            const data: OverrideTransactionType = await result.json();
    
            return data;
        })
    } catch (err) {
        throw err;
    }
}

export const sendTransactionReport = async (machineName: string, email: string) => {

    const result = await fetch(`${API_URL}/reports/${machineName}/${email}`);

    if (!result.ok) {
        const data: { error: string } = await result.json();
        throw new Error(JSON.stringify(data));
    }

    const data: { success: boolean, message: string } = await result.json();
    
    return data.success
}

export const lockMachine = async () => {
    const result = await fetch(`${PI_URL}/lock`);

    if (!result.ok) {
        const data: { error: string } = await result.json();
        throw new Error(JSON.stringify(data));
    }

    const data: { success: boolean, message: string } = await result.json();

    return data;
}


export const unlockMachine = async () => {
    const result = await fetch(`${PI_URL}/unlock`);

    if (!result.ok) {
        const data: { error: string } = await result.json();
        throw new Error(JSON.stringify(data));
    }

    const data: { success: boolean, message: string } = await result.json();

    return data;
}