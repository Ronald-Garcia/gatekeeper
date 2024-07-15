import { PAGES, setCurrentPage } from "@/lib/store";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import RemoveBudget from "./remove-budget/remove-budget";

const BudgetActions = () => {


    const goToAddBudget = () => {
        setCurrentPage(PAGES.ADMIN_ADD_BUDGET);
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Budget Actions
                    </CardTitle>

                    <CardDescription>
                        This card contains the actions you can perform on budgets.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="italic">
                        Quick Action
                    </p>
                    <ul>
                        <li>  
                            <Button
                            variant="link"
                            onClick={goToAddBudget}>
                                Add a Budget Code
                            </Button>
                        </li>
                        <li>
                            <RemoveBudget></RemoveBudget>
                        </li>
                    </ul>
                    <Separator className="my-4"></Separator>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                Manage Budgets...
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Send a Report
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
            </Card>
            </>
    );

}

export default BudgetActions;