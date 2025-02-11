
import { BudgetType, MachineType, OverrideTransactionType, BudgetRelationType, UserType, MachineRelationType } from "@/data/types";
import { atom } from "nanostores";
import { logger } from "@nanostores/logger";

export const PAGES = { 
    START: 0,
    IP: 1,
    BUDGET: 2,
    ADMIN_START: 3,
    ADMIN_ADD_STUDENT: 4,
    ADMIN_UPDATE_STUDENT: 5,
    ADMIN_ADD_BUDGET: 6,
    IPO: 7,
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

const emptyUser: UserType = {
    jid: 0,
    firstname: "",
    lastname: "",
    banned: 0,
    admin: 0,
    jhed: ""
};

export const $currentUser = atom<UserType>({
        jid: 0,
        firstname: "",
        lastname: "",
        banned: 0,
        admin: 0,
        jhed: ""
    }
);

export const setUser = (newUser: UserType) => {
    $currentUser.set(newUser);
}
export const clearUser = () => {
    $currentUser.set(emptyUser);
}
export const $budgetCodeUsed = atom<number>(0);

export const setBudgetCodeUsed = (newBudgetCodeUsed: number) => {
    $budgetCodeUsed.set(newBudgetCodeUsed);
}


export const $newUser = atom<UserType>({
    jid: -1,
    firstname: "",
    lastname: "",
    banned: 0,
    admin: 0,
    jhed: ""
});

const clearJID = -1;

export const clearNewUserJid = () => {
    $userJID.set(clearJID);
}

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

export const setNewUserAdmin = (admin: number) => {
    $newUser.get().admin = admin;
}

export const setNewUserJHED = (jhed: string) => {
    $newUser.get().jhed = jhed;
}

export const invalidNewUser = () => {

    const newUser = $newUser.get();
    const noNameChosen = (newUser.firstname === "") || (newUser.lastname === "");
    const noJIDChosen = (newUser.jid === -1);
    const noJHEDChosen = (newUser.jhed === "");

    return noNameChosen || noJIDChosen || noJHEDChosen;
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

export const resetNewBudget = () => {
    $newBudget.set({
        id: -1,
        alias: "",
        isSeniorDesign: 0,
        isLab: 0,
        isClass: 0
    });
}
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

export const $newBudgetRelationList = atom<BudgetRelationType[]>([]);

export const toggleBudgetRelation = (relation: BudgetRelationType) => {

    const relationExists = $newBudgetRelationList.get().some(r => (r.budgetId === relation.budgetId && r.jid === relation.jid));

    if (!relationExists) {
        $newBudgetRelationList.get().push(relation);
    } else {
        $newBudgetRelationList.set($newBudgetRelationList.get().filter(r => (r.budgetId !== relation.budgetId || r.jid !== relation.jid)));
    }
} 

export const setBudgetRelationList = (r: BudgetRelationType[]) => {
    $newBudgetRelationList.set(r);
}

export const $budgetRelationsToDelete = atom<BudgetRelationType[]>([]);

export const toggleBudgetRelationToDelete = (relation: BudgetRelationType) => {
    
    const relationExists = $budgetRelationsToDelete.get().some(r => (r.budgetId === relation.budgetId && r.jid === relation.jid));

    if (!relationExists) {
        $budgetRelationsToDelete.get().push(relation);
    } else {
        $budgetRelationsToDelete.set($budgetRelationsToDelete.get().filter(r => (r.budgetId !== relation.budgetId || r.jid !== relation.jid)));
    }
}

export const resetBudgetRelations = () => {
    $budgetRelationsToDelete.set([]);
    $newBudgetRelationList.set([]);
}


export const $newMachine = atom<MachineType>({
    id: -1,
    name: "",
    rate: -1
});

export const setNewMachineName = (name: string) => {
    $newMachine.get().name = name;
}
export const setNewMachineRate = (rate: number) => {
    $newMachine.get().rate = rate;
}

export const setNewMachine = (machine: MachineType) => {
    $newMachine.set(machine);
}

export const invalidNewMachine = () => {
    const newMachine = $newMachine.get();
    const noAliasChosen = (newMachine.name === "")
    const noRateChosen = (newMachine.rate === -1);

    return noAliasChosen || noRateChosen;
}

export const $newMachineRelationList = atom<MachineRelationType[]>([]);

export const toggleMachineRelation = (relation: MachineRelationType) => {

    const relationExists = $newMachineRelationList.get().some(r => (r.machineId === relation.machineId && r.jid === relation.jid));

    if (!relationExists) {
        $newMachineRelationList.get().push(relation);
    } else {
        $newMachineRelationList.set($newMachineRelationList.get().filter(r => (r.machineId !== relation.machineId || r.jid !== relation.jid)));
    }
} 

export const setMachineRelationList = (r: MachineRelationType[]) => {
    $newMachineRelationList.set(r);
}

export const $machineRelationsToDelete = atom<MachineRelationType[]>([]);

export const toggleMachineRelationToDelete = (relation: MachineRelationType) => {
    
    const relationExists = $machineRelationsToDelete.get().some(r => (r.machineId === relation.machineId && r.jid === relation.jid));

    if (!relationExists) {
        $machineRelationsToDelete.get().push(relation);
    } else {
        $machineRelationsToDelete.set($machineRelationsToDelete.get().filter(r => (r.machineId !== relation.machineId || r.jid !== relation.jid)));
    }
}

export const resetMachineRelations = () => {
    $machineRelationsToDelete.set([]);
    $newMachineRelationList.set([]);
}

export const $overrideTransaction = atom<OverrideTransactionType[]>([]);

export const addOverride = (t: OverrideTransactionType) => {
    $overrideTransaction.set([...$overrideTransaction.get(), t]);
}

export const emptyOverride = () => {
    $overrideTransaction.set([]);
}

logger({ $newUser, $userJID});