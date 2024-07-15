
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { $currentUser, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import StartSessionAlert from "./start-session-alert";
import { getBudgetsFromUser } from "@/data/api";

const SelectBudget = () => {

    const currentUser = useStore($currentUser);

    const userBudgets = getBudgetsFromUser(currentUser.jid);
    return (
        <>
            <Card className="w-[90%]">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Welcome, {currentUser.firstname}.
                    </CardTitle>
                    <CardDescription className="italic">
                        {"Select the budget code to be applied."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ToggleGroup type="single">
                        {userBudgets.map((code) => {
                            return (
                                <ToggleGroupItem key={"val" + code.id} value={"val" + code.id} variant="outline"> {code.alias} </ToggleGroupItem>
                            );
                        })}
                    </ToggleGroup>

                </CardContent>
                <CardFooter className="flex justify-end space-x-4">
                    <Button variant="secondary" onClick={()=>{setCurrentPage(PAGES.START)}}> Cancel </Button>
                    <StartSessionAlert disabled={currentUser.budgetCodes === null}></StartSessionAlert>
                </CardFooter>
            </Card>
        </>
    );
}

export default SelectBudget;