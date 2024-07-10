import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { ChangeEvent } from "react";
import { PAGES, setCurrentPage, setNewBudgetId, setNewBudgetAlias, switchToNewBudgetLabel } from "@/lib/store";
import { Button } from "../../ui/button";
import AddBudgetConfirmation from "./add-student-confirmation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddBudget = () => {

    const onChangeID = (e: ChangeEvent<HTMLInputElement>) => {
        setNewBudgetId(e.target.value);
    }
    const onChangeAlias = (e: ChangeEvent<HTMLInputElement>) => {
        setNewBudgetAlias(e.target.value);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Adding a new Budget
                    </CardTitle>
                    <CardDescription className="italic">
                        This page is to add a new budget code.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div>
                        <p className="text-sm font-medium">
                            Budget Identification.*
                        </p>
                        <p className="text-[9pt] italic">
                            Input the budget's id and alias to add them to the system.
                        </p>
                    </div>

                    <div className="flex flex-row space-x-5">
                        <Input placeholder="ID"
                        onChange={onChangeID}>
                        </Input>
                        <Input placeholder="Alias"
                        onChange={onChangeAlias}>
                        </Input>
                    </div>
                    

                    <Separator></Separator>
                    <div>
                        <p className="text-sm font-medium">
                            Budget's Labels.*
                        </p>
                        <p className="text-[9pt] italic">
                            Click on the label that belongs to the budget.
                        </p>
                    </div>
                    
                        <RadioGroup className="flex flex-col">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem 
                                    id="sd" 
                                    value="Senior Design?"
                                    onClick={()=>{switchToNewBudgetLabel("SD")}}>
                                </RadioGroupItem>
                                <label
                                    htmlFor="sd"
                                    className="font-medium text-sm">
                                    Senior Design?
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem 
                                id="sd" 
                                value="Class?"
                                onClick={()=>{switchToNewBudgetLabel("class")}}>
                                </RadioGroupItem>
                                <label
                                    htmlFor="sd"
                                    className="font-medium text-sm">
                                    Class?
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem 
                                    id="sd" 
                                    value="Lab?"
                                    onClick={()=>{switchToNewBudgetLabel("lab")}}>
                                </RadioGroupItem>
                                <label
                                    htmlFor="sd"
                                    className="font-medium text-sm">
                                    Lab?
                                </label>
                            </div>
                        </RadioGroup>
                    <Separator></Separator>
                </CardContent>
                <CardFooter className="flex flex-row justify-end space-x-3">
                    <Button variant="secondary"
                        onClick={() => {setCurrentPage(PAGES.ADMIN_START)}}>
                        Cancel
                    </Button>
                    <AddBudgetConfirmation></AddBudgetConfirmation>
                </CardFooter>
            </Card>
        </>
    );
}

export default AddBudget;