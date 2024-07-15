export interface UserType {
    jid: number,
    firstname: string,
    lastname: string,
    banned: number,
    machinePerm: number,
    admin: number
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

export interface RelationType {
    id: number,
    userID: number,
    budgetId: number
}