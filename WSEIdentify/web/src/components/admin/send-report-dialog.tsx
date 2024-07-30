import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { sendTransactionReport } from "@/data/api";
import { toast } from "../ui/use-toast";

const SendReportDialog = () => {

    const submitButton = useRef<HTMLButtonElement>(null);
    const [ email, setEmail] = useState("");
    const [ machineName, setMachineName] = useState("");
    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const updateMachineName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMachineName(e.target.value);
    }

    const onEnterSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (submitButton && submitButton.current) {
                submitButton.current.click();
            }
        }
    }

    const onSubmitClick = async () => {
        try {
            const res = await sendTransactionReport(machineName, email);
            if (!res) {
                throw new Error("The email was not properly sent. Make sure this is a gmail!");
            }
            toast({
                title: "Email sent successfully!",
                description: "Check your gmail to see the report!"
            })

        } catch (err) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong! 😔",
                description: (err as Error).message
            })
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link">
                    Send report.
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Send a report of transactions!
                    </DialogTitle>
                    <DialogDescription>
                        Please input the gmail to send the transactions to.
                    </DialogDescription>
                </DialogHeader>

                <Input
                    onChange={updateEmail}
                    placeholder="Enter the Gmail"
                    onKeyDown={onEnterSubmit}>
                </Input>
                <Input
                    placeholder="Enter the machine name"
                    onChange={updateMachineName}
                    onKeyDown={onEnterSubmit}>
                </Input>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            ref={submitButton}
                            onClick={onSubmitClick}>
                            Send email to this gmail!
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SendReportDialog;