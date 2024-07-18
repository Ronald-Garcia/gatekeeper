export interface UserType {
    jid: number,
    firstname: string,
    lastname: string,
    banned: number,
    machinePerm: number,
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

export interface RelationType {
    id?: number,
    jid: number,
    budgetId: number
}

export interface TransactionType {
    timeSpent: number,
    code: number,
    machineUsed: number,
    userJHED: string
}