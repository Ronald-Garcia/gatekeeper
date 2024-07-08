
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { $currentUser, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "./ui/button";
import StartSessionAlert from "./start-session-alert";
const SelectBudget = () => {

    const currentUser = useStore($currentUser);

    return (
        <>
            <Card className="w-[90%]">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Welcome, {currentUser.firstname}.
                    </CardTitle>
                    <CardDescription className="italic">
                        {currentUser.budgetCodes !== null ? "Select the budget code to be applied." : "It seems as if you do not have any budget codes! Please contact an admin."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    { currentUser.budgetCodes !== null && <ToggleGroup type="multiple">
                        {Object.values(currentUser.budgetCodes).map((code) => {
                            const namesAndAliases = Object.values(code);

                            return (
                                <ToggleGroupItem key={"val" + namesAndAliases[0]} value={"val" + namesAndAliases[0]} variant="outline"> {namesAndAliases.join(", ")} </ToggleGroupItem>
                            );
                        })}
                    </ToggleGroup>}

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