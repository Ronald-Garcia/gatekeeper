
import { BudgetType, MachineType, RelationType, UserType } from "@/data/types";
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
        jhed: ""
    }
);

export const setUser = (newUser: UserType) => {
    $currentUser.set(newUser);
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
    machinePerm: 0,
    admin: 0,
    jhed: ""
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

export const $newRelationList = atom<RelationType[]>([]);

export const toggleRelation = (relation: RelationType) => {

    const relationExists = $newRelationList.get().some(r => (r.budgetId === relation.budgetId && r.jid === relation.jid));

    if (!relationExists) {
        $newRelationList.get().push(relation);
    } else {
        $newRelationList.set($newRelationList.get().filter(r => (r.budgetId !== relation.budgetId || r.jid !== relation.jid)));
    }
} 

export const setRelationList = (r: RelationType[]) => {
    $newRelationList.set(r);
}

export const $relationsToDelete = atom<RelationType[]>([]);

export const toggleRelationToDelete = (relation: RelationType) => {
    
    const relationExists = $relationsToDelete.get().some(r => (r.budgetId === relation.budgetId && r.jid === relation.jid));

    if (!relationExists) {
        $relationsToDelete.get().push(relation);
    } else {
        $relationsToDelete.set($relationsToDelete.get().filter(r => (r.budgetId !== relation.budgetId || r.jid !== relation.jid)));
    }
}

export const resetRelations = () => {
    $relationsToDelete.set([]);
    $newRelationList.set([]);
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
