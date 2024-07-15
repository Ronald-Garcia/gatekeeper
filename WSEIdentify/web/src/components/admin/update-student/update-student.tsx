import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { getAllAvailableMachines, getAllBudgetCodes, getBudgetsFromUser } from "@/data/api";
import { useToast } from "../../ui/use-toast";
import { useState, useEffect } from "react";
import { BudgetType, MachineType } from "@/data/types";
import { Separator } from "../../ui/separator";
import { ChangeEvent } from "react";
import { $newRelationList, $newUser, $relationsToDelete, PAGES, resetRelations, setCurrentPage, setNewUserAdmin, setNewUserFirstName, setNewUserLastName, setNewUserMachinePerms, toggleRelation, toggleRelationToDelete } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "../../ui/button";
import UpdateStudentConfirmation from "./update-student-confirmation";

const UpdateStudent = () => {

    const newUser = useStore($newUser);
    const newRelations = useStore($newRelationList);
    const relationsToDelete = useStore($relationsToDelete);



    const { toast } = useToast();
    const [ allAvalableMachines, setAllAvailableMachines ] = useState<MachineType[]>([]);
    const [ allBudgets, setAllBudgets ] = useState<BudgetType[]>([]);
    const [ userBudgets, setUserBudgets ] = useState<BudgetType[]>([]); 
    const onChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUserFirstName(e.target.value);
    }
    const onChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUserLastName(e.target.value);
    }
    
    const renderAllAvailableMachines = async () => {
        try {
            const allMachines = await getAllAvailableMachines();
            if (allAvalableMachines === null) {
                throw new Error("No machines found on the server. Please notify an admin.");
            }
            setAllAvailableMachines(allMachines);
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
    }

    const renderAllBudgets = async () => {
        try {
            const allBudgetCodes = await getAllBudgetCodes();
            if (allBudgetCodes === null) {
                throw new Error("No budgets found on the server. Please notify an admin.");
            }
            setAllBudgets(allBudgetCodes);
            
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
    }
    let adminToggle = 0;
    const onCheckedChangedAdmin = () => {
        adminToggle ^= 1;
        setNewUserAdmin(adminToggle);
    }
    useEffect(()=> {
        renderAllAvailableMachines();
        renderAllBudgets();
        getBudgetsFromUser(newUser.jid).then(budgets => setUserBudgets(budgets));
        resetRelations();
    }, []);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Updating a Student Account
                    </CardTitle>
                    <CardDescription className="italic">
                        This page is to update {newUser.firstname}'s account.
                        To change the JID, please create a new account and delete this one.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="text-sm font-medium">
                            Student's Identification
                        </p>
                        <p className="text-[9pt] italic">
                            Input a new name or JID if they are to be changed.
                        </p>
                    </div>

                    <div className="flex flex-row space-x-5">
                        <Input placeholder="First Name"
                        defaultValue={newUser.firstname}
                        onChange={onChangeFirstName}>
                        </Input>
                        <Input placeholder="Last Name"
                        defaultValue={newUser.lastname}
                        onChange={onChangeLastName}>
                        </Input>
                    </div>

                    <Separator></Separator>
                    <div>
                        <p className="text-sm font-medium">
                            Student's Permissions
                        </p>
                        <p className="text-[9pt] italic">
                            Click on the permission(s) to add them to the student's account.
                        </p>
                    </div>
                    

                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2 ">
                            <Checkbox id="isAdmin" className="transition-all" defaultChecked={newUser.admin === 1} onCheckedChange={onCheckedChangedAdmin}/>
                            <label
                                htmlFor="isAdmin"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Admin?
                            </label>
                        </div>
                        {allAvalableMachines.map((machine, i)=> {
                                return (
                                    <div key={`div for ${machine.name}`} className="flex items-center space-x-2">
                                        <Checkbox 
                                        key={machine.name} 
                                        id={machine.name} 
                                        defaultChecked={(newUser.machinePerm & (1 << i)) === (1 << i)}
                                        className="transition-all"
                                        onCheckedChange={() => {
                                            setNewUserMachinePerms(newUser.machinePerm ^ (1 << i));
                                        }}> </Checkbox>
                                    <label
                                key={`label for ${machine.name}`}
                                htmlFor={machine.name}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Permissions for {machine.name}?
                                </label>
                        </div>
                    );
                        })}
                    </div>
                    <Separator></Separator>
                    <div>
                        <p className="text-sm font-medium">
                            Student's Budgets
                        </p>
                        <p className="text-[9pt] italic">
                            Click on the budget(s) to add them to the student's account.
                        </p>
                    </div>
                    {allBudgets.map((budget)=> {
                        const alreadyHave = userBudgets.some(b => b.id === budget.id);
                        return (
                            <div key={`div for ${budget.id}`} className="flex items-center space-x-2">

                                {alreadyHave ? <Checkbox
                                    key={budget.alias} 
                                    id={`${budget.id}`}
                                    defaultChecked={alreadyHave}
                                    className="transition-all"
                                    onCheckedChange={() => {
                                        toggleRelationToDelete({ jid: newUser.jid, budgetId: budget.id });
                                        console.log("im here, updating and deleting");
                                        console.log(newRelations);
                                        console.log(relationsToDelete);
                                    }}
                                    >
                                </Checkbox> 
                                : 
                                <Checkbox
                                    key={budget.alias} 
                                    id={`${budget.id}`}
                                    defaultChecked={alreadyHave}
                                    className="transition-all"
                                    onCheckedChange={() => {
                                        toggleRelation({ jid: newUser.jid, budgetId: budget.id });
                                        console.log("im here, updating");
                                        console.log(newRelations);
                                    }}
                                    >
                                </Checkbox>}        
                                <label
                                    key={`label for ${budget.id}`}
                                    htmlFor={`${budget.id}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {budget.alias}
                                </label>

                            </div>
                        );
                    })}

                </CardContent>
                <CardFooter className="flex flex-row justify-end space-x-3">
                    <Button variant="secondary"
                        onClick={() => {setCurrentPage(PAGES.ADMIN_START)}}>
                        Cancel
                    </Button>
                    <UpdateStudentConfirmation></UpdateStudentConfirmation>
                </CardFooter>
            </Card>
        </>
    );
}

export default UpdateStudent;