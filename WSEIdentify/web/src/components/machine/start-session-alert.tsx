import { PAGES, setCurrentPage } from "@/lib/store";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Button } from "@/components/ui/button";

type StartSessionAlertProps = {
    disabled: boolean
}

const StartSessionAlert = ({ disabled }: StartSessionAlertProps) => {

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
                            <Button variant="destructive" onClick={() => {setCurrentPage(PAGES.IP)}}>
                                Ready!
                            </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                
            </AlertDialog>
        </>
    );
}

export default StartSessionAlert;