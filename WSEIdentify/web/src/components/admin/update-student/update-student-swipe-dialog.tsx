import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { setNewUserJid, $newUser, setCurrentPage, PAGES, setNewUser, setNewUserJHED} from "@/lib/store";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { useRef } from "react";
import { getUserByJHED, getUserByJID } from "@/data/api";
import { useStore } from "@nanostores/react";

const UpdateStudentSwipeDialog = () => {

    const [ tempJID, setTempJID ] = useState<string>("");
    const [ tempJHED, setTempJHED ] = useState<string>("");
    const { toast } = useToast();
    const closeButton = useRef(null);
    const newUser = useStore($newUser);
    const onChangeJID = (e: ChangeEvent<HTMLInputElement>) => {
        setTempJID(e.target.value);
    }

    const onChangeJHED = (e: ChangeEvent<HTMLInputElement>) => {
        setTempJHED(e.target.value);
    }

    const onSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (e.key === "Enter") {
                setNewUserJid(tempJID);
                const result = await getUserByJID(newUser.jid);
                setNewUser(result);
            
                setCurrentPage(PAGES.ADMIN_UPDATE_STUDENT);
                (closeButton.current! as HTMLButtonElement).click();
                toast({
                    variant: "default",
                    description: "User was successfully retrieved.",
                    title: "Success! ✅"
                })
            }
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
    }

    const onSubmitJHED = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (e.key === "Enter") {
                setNewUserJHED(tempJHED);
                const result = await getUserByJHED(newUser.jhed);
                setNewUser(result);
            
                setCurrentPage(PAGES.ADMIN_UPDATE_STUDENT);
                (closeButton.current! as HTMLButtonElement).click();
                toast({
                    variant: "default",
                    description: "User was successfully retrieved.",
                    title: "Success! ✅"
                })
            }
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                    variant="link">
                        Update a Student's Info
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">
                            JID Detection
                        </DialogTitle>
                        <DialogDescription className="text-md italic">
                            Please swipe the J-Card of the student to be updated, or type their JHED.
                        </DialogDescription>
                    </DialogHeader>

                    <Input onChange={onChangeJID}
                    onKeyDown={onSubmit}
                    placeholder={"JID (Swipe here)"}/>

                    
                    <Input onChange={onChangeJHED}
                    onKeyDown={onSubmitJHED}
                    placeholder={"JHED"}/>



                    <DialogFooter className="flex flex-row justify-end">
                    <DialogClose ref={closeButton} asChild>
                        <Button
                        variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
                </DialogContent>
                
            </Dialog>
        </>
    );
}

export default UpdateStudentSwipeDialog;