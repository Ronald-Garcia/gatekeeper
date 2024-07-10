import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AddStudentSwipeDialog from "./add-student-swipe-dialog";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { getAllAvailableMachines, getAllBudgetCodes } from "@/data/api";
import { useToast } from "../../ui/use-toast";
import { useState, useEffect } from "react";
import { BudgetType, MachineType } from "@/data/types";
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group";
import { Separator } from "../../ui/separator";
import { ChangeEvent } from "react";
import { $newUser, toggleNewUserBudgetCodes, PAGES, setCurrentPage, setNewUserAdmin, setNewUserFirstName, setNewUserLastName, setNewUserMachinePerms } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "../../ui/button";
import AddStudentConfirmation from "./add-student-confirmation";

const AddStudent = () => {

    const newUser = useStore($newUser);

    const { toast } = useToast();
    const [ allAvalableMachines, setAllAvailableMachines ] = useState<MachineType[]>([]);
    const [ allBudgets, setAllBudgets ] = useState<BudgetType[]>([]);



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
    }, []);

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Adding a new Student Account
                    </CardTitle>
                    <CardDescription className="italic">
                        This page is to add a new student account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="text-sm font-medium">
                            Student's Identification*
                        </p>
                        <p className="text-[9pt] italic">
                            Input the student's name and JID to add them to the student's account.
                        </p>
                    </div>

                    <div className="flex flex-row space-x-5">
                        <Input placeholder="First Name"
                        onChange={onChangeFirstName}>
                        </Input>
                        <Input placeholder="Last Name"
                        onChange={onChangeLastName}>
                        </Input>
                    </div>
                    <div className="flex ">
                        <AddStudentSwipeDialog></AddStudentSwipeDialog>
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
                            <Checkbox id="isAdmin" className="transition-all" onCheckedChange={onCheckedChangedAdmin}/>
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
                                        className="transition-all"
                                        onCheckedChange={() => {
                                            setNewUserMachinePerms(newUser.machinePerm ^ (1 << i));
                                            console.log(newUser.machinePerm.toString(2));
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
                    <ToggleGroup type="multiple">
                        {allBudgets.map((budget)=> {
                            return (
                                <ToggleGroupItem 
                                    key={budget.alias} 
                                    value={budget.alias}
                                    onClick={() => {
                                        toggleNewUserBudgetCodes(budget);
                                        console.log(newUser.budgetCodes);
                                    }}>
                                    {budget.alias}
                                </ToggleGroupItem>        
                            );
                        })}
                    </ToggleGroup>

                </CardContent>
                <CardFooter className="flex flex-row justify-end space-x-3">
                    <Button variant="secondary"
                        onClick={() => {setCurrentPage(PAGES.ADMIN_START)}}>
                        Cancel
                    </Button>
                    <AddStudentConfirmation></AddStudentConfirmation>
                </CardFooter>
            </Card>
        </>
    );
}

export default AddStudent;