import { PAGES, setCurrentPage } from "@/lib/store";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import UpdateStudentSwipeDialog from "./update-student/update-student-swipe-dialog";

const StudentActons = () => {

    const goToAddStudent = () => {
        setCurrentPage(PAGES.ADMIN_ADD_STUDENT);
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Account Actions
                    </CardTitle>

                    <CardDescription>
                        This card contains the actions you can perform on user accounts.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ul>
                        <p className="italic">
                            Quick Action
                        </p>
                        <li>  
                            <Button
                            variant="link"
                            onClick={goToAddStudent}>
                                Add a Student
                            </Button>
                        </li>
                        <li>
                            <UpdateStudentSwipeDialog>
                            </UpdateStudentSwipeDialog>
                        </li>
                    </ul>
                    <Separator className="my-4"></Separator>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                >
                                    Manage Students...
                                </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                Delete a Student Account
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

export default StudentActons;