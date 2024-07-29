import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import SendReportDialog from "./send-report-dialog";

const TransactionActions = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Transaction Actions
                    </CardTitle>

                    <CardDescription>
                        This card contains the actions you can perform on transactions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="italic">
                        Quick Action
                    </p>
                    <ul>
                        <li>  
                            <SendReportDialog></SendReportDialog>
                        </li>
                    </ul>
                    <Separator className="my-4"></Separator>
                </CardContent>
            </Card>
            </>
    );

}

export default TransactionActions;