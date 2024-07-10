import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

const BudgetActions = () => {

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
                            variant="link">
                                Add a Budget Code
                            </Button>
                        </li>
                        <li>
                            <Button
                            variant="link">
                                Remove a Budget Code
                            </Button>
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
                                Add a Budget Code
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Remove a Budget Code
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Update a Budget Code
                            </DropdownMenuItem>
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