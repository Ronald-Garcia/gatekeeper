
import { BudgetType, UserType } from "@/data/types";
import { atom } from "nanostores";

export const PAGES = { 
    START: 0,
    IP: 1,
    BUDGET: 2,
    ADMIN_START: 3,
    ADMIN_ADD_STUDENT: 4,
    ADMIN_UPDATE_STUDENT: 5,
    ADMIN_ADD_BUDGET: 6
}


export const $currentPage = atom<number>(PAGES.START);

export const setCurrentPage = (newPage: number) => {
    $currentPage.set(newPage);
}

export const $userJID = atom<number>(0);

export const setUserJID = (newID: string) => {
    try {
        const actualID = parseInt(newID.substring(1, newID.length - 1));
        $userJID.set(actualID);    
    } catch (err) {
        throw new Error()
    }
}

export const $currentUser = atom<UserType>({
        jid: 0,
        firstname: "",
        lastname: "",
        banned: 0,
        machinePerm: 0,
        admin: 0,
        budgetCodes: [],
    }
);

export const setUser = (newUser: UserType) => {
    $currentUser.set(newUser);
}

export const $budgetCodeUsed = atom<string>("");

export const setBudgetCodeUsed = (newBudgetCodeUsed: string) => {
    $budgetCodeUsed.set(newBudgetCodeUsed);
}


export const $newUser = atom<UserType>({
    jid: -1,
    firstname: "",
    lastname: "",
    banned: 0,
    machinePerm: 0,
    admin: 0,
    budgetCodes: [],
});

export const setNewUserJid = (jid: string) => {
    try {
        const actualID = parseInt(jid.substring(1, jid.length - 1));
        if (Number.isNaN(actualID)) {
            throw new Error();
        }
        $newUser.get().jid = actualID;    
    } catch (err) {
        throw new Error("Invalid JID! Please swipe again!");
    }
}


export const setNewUserFirstName = (firstName: string) => {
    $newUser.get().firstname = firstName;
}

export const setNewUserLastName = (lastName: string) => {
    $newUser.get().lastname = lastName;
}

export const setNewUserMachinePerms = (machinePerms: number) => {
    $newUser.get().machinePerm = machinePerms;
}

export const setNewUserBudgetCodes = (budgetCodes: BudgetType[]) => {
    $newUser.get().budgetCodes = budgetCodes;
}

export const toggleNewUserBudgetCodes = (budgetCode: BudgetType) => {
    const userBudget = $newUser.get().budgetCodes.find(b => b.id === budgetCode.id);
    if (userBudget) {
        $newUser.get().budgetCodes = $newUser.get().budgetCodes.filter(c => c.id !== budgetCode.id);
    } else {
        $newUser.get().budgetCodes.push(budgetCode);
    }
}
export const setNewUserAdmin = (admin: number) => {
    $newUser.get().admin = admin;
}

export const invalidNewUser = () => {

    const newUser = $newUser.get();
    const noNameChosen = (newUser.firstname === "") || (newUser.lastname === "");
    const noJIDChosen = (newUser.jid === -1);

    return noNameChosen || noJIDChosen;
}

export const setNewUser = (user: UserType) => {
    $newUser.set(user);
}

export const $newBudget = atom<BudgetType>({
    id: -1,
    alias: "",
    isSeniorDesign: 0,
    isLab: 0,
    isClass: 0
});

export const setNewBudgetId = (newId: string) => {
    try {
        const actualID = parseInt(newId);
        $newBudget.get().id = actualID;
    } catch (err) {
        throw new Error("Invalid budget ID! Please type a number.");
    }
}
export const setNewBudgetAlias = (alias: string) => {
    $newBudget.get().alias = alias;
}
export const switchToNewBudgetLabel = (label: string) => {
    const newBudget = $newBudget.get();

    newBudget.isClass = label === "class" ? 1 : 0;
    newBudget.isSeniorDesign = label === "SD" ? 1 : 0;
    newBudget.isLab = label === "lab" ? 1 : 0;
}

export const setNewBudget = (budget: BudgetType) => {
    $newBudget.set(budget);
}

export const invalidNewBudget = () => {
    const newBudget = $newBudget.get();
    const noAliasChosen = (newBudget.alias === "")
    const noIDChosen = (newBudget.id === -1);
    const noTypeChosen = !(newBudget.isClass || newBudget.isLab || newBudget.isSeniorDesign);

    return noAliasChosen || noIDChosen || noTypeChosen;
}