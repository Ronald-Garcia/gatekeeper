
import { UserType } from "@/data/types";
import { atom } from "nanostores";

export const PAGES = { 
    START: 0,
    IP: 1,
    BUDGET: 2,

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
        banned: false,
        machinePerm: 0,
        admin: false,
        budgetCodes: {},
    }
);

export const setUser = (newUser: UserType) => {
    $currentUser.set(newUser);
}

export const $budgetCodeUsed = atom<string>("");

export const setBudgetCodeUsed = (newBudgetCodeUsed: string) => {
    $budgetCodeUsed.set(newBudgetCodeUsed);
}