import { PAGES, setCurrentPage } from "@/lib/store";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { unlockMachine } from "@/data/api";

type StartSessionAlertProps = {
    disabled: boolean,
    budgetAdded: boolean
}

const StartSessionAlert = ({ disabled, budgetAdded }: StartSessionAlertProps) => {

    const { toast } = useToast();

    const onSubmit = async () => {
        if (!budgetAdded) {
            toast({
                variant: "destructive",
                description: "No budget was selected! Please select a budget.",
                title: "Uh oh! Something went wrong! 😔"
            })
            return;
        }
        try {
            const data = await unlockMachine();
            console.log(data);
            if (data.message.startsWith("e")) {
                throw new Error("Could not lock machine! Please see staff to turn off machine.")
            }

            
            setCurrentPage(PAGES.IP)    
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        disabled={disabled}>
                        Start session!
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to start the session?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="font-bold text-red-400 italic">
                            Remember to end your session once your done to prevent overcharging!!!
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                            <AlertDialogCancel asChild>
                                <Button variant="secondary">
                                    Wait...
                                </Button>
                            </AlertDialogCancel>
                            <Button variant="destructive" onClick={onSubmit}>
                                Ready!
                            </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                
            </AlertDialog>
        </>
    );
}

export default StartSessionAlert;