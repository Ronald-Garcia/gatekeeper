import BudgetActions from "./budget-actions";
import StudentActons from "./student-actions";

import { useStore } from "@nanostores/react";
import { $currentUser, clearNewUserJid, clearUser, PAGES, setCurrentPage } from "@/lib/store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import MachineActions from "./machine-actions";
import { Button } from "../ui/button";
import TransactionActions from "./transaction-actions";

const AdminStart = () => {
    const curAdmin = useStore($currentUser)
    return (
        <Card>
            <CardContent>
            <CardHeader>
                <CardTitle className = "text-start font-bold text-lg">
                    Welcome, {curAdmin.firstname}
                </CardTitle>
                <CardDescription className="italic">
                    This page lists all the admin actions you can perform.
                </CardDescription>
            </CardHeader>
            
                <div className="grid grid-cols-2">
                    <StudentActons></StudentActons>
                    <BudgetActions></BudgetActions>
                    <MachineActions></MachineActions>
                    <TransactionActions></TransactionActions>
                </div>
            </CardContent>
            <CardFooter>
                <Button
                onClick={() => {
                    setCurrentPage(PAGES.START)
                    clearUser();
                    clearNewUserJid();
                    }}>
                    Go Back!
                </Button>
            </CardFooter>
        </Card>

    );
}

export default AdminStart;