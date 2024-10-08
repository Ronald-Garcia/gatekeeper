export interface UserType {
    jid: number,
    firstname: string,
    lastname: string,
    banned: number,
    admin: number,
    jhed: string
}

export interface MachineType {
    name: string,
}

export interface BudgetType {
    id: number,
    alias: string,
    isSeniorDesign: number,
    isLab: number,
    isClass: number
}


export interface MachineType {
    id: number,
    name: string,
    rate: number,
}

export interface BudgetRelationType {
    id?: number,
    jid: number,
    budgetId: number
}

export interface MachineRelationType {
    id?: number,
    jid: number,
    machineId: number
}

export interface TransactionType {
    moneySpent: number,
    code: number,
    budgetName: string,
    machineUsed: number,
    userJHED: string
}

export interface OverrideTransactionType {
    timeSpent: number,
    machineUsed: string,
    userJid: number,
    date: Date,
}