import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import RemoveBudget from "./remove-budget/remove-budget";
import AddMachineDialog from "./add-machine/add-machine";
import RemoveMachine from "./remove-machine/remove-machine";

const MachineActions = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Machine Actions
                    </CardTitle>

                    <CardDescription>
                        This card contains the actions you can perform on machines.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="italic">
                        Quick Action
                    </p>
                    <ul>
                        <li>  
                            <AddMachineDialog></AddMachineDialog>
                        </li>
                        <li>
                            <RemoveMachine></RemoveMachine>
                        </li>
                    </ul>
                    <Separator className="my-4"></Separator>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button>
                                Manage Machines...
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

export default MachineActions;