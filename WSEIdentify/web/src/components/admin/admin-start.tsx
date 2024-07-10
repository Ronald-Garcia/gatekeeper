import BudgetActions from "./budget-actions";
import StudentActons from "./student-actions";

import { useStore } from "@nanostores/react";
import { $currentUser } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const AdminStart = () => {
    const curAdmin = useStore($currentUser)
    return (
        <Card>
            <CardHeader>
                <CardTitle className = "text-start font-bold text-lg">
                    Welcome, {curAdmin.firstname}
                </CardTitle>
                <CardDescription className="italic">
                    This page lists all the admin actions you can perform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2">
                    <StudentActons></StudentActons>
                    <BudgetActions></BudgetActions>
                </div>
            </CardContent>

        </Card>

    );
}

export default AdminStart;