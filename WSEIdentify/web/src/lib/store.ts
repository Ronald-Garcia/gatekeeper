
import { UserType } from "@/data/types";
import { atom } from "nanostores";

export const PAGES = { 
    START: 0,
    SWIPE: 1,
    OTHER: 2
}


export const $currentPage = atom<number>(PAGES.START);

export const setCurrentPage = (newPage: number) => {
    $currentPage.set(newPage);
}

export const getCurrentPage = () => {
    return $currentPage.get();
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

export const getUserJID = () => {
    return $userJID.get();
}

export const $currentUser = atom<UserType>({
        id: -1,
        jid: 0,
        name: "",
        banned: false,
        machinePerm: 0,
        admin: false,
    }
);

export const setUser = (newUser: UserType) => {
    $currentUser.set(newUser);
}

export const getUser = () => {
    return $currentUser.get();
}