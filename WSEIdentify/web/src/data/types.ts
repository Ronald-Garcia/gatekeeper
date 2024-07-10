export interface UserType {
    jid: number,
    firstname: string,
    lastname: string,
    banned: number,
    machinePerm: number,
    admin: number,
    budgetCodes: BudgetType[]
}

export interface MachineType {
    name: string,
}

export interface BudgetType {
    id: number,
    alias: string
}