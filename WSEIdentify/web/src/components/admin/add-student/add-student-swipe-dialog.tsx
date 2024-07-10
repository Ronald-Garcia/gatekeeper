import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { setNewUserJid, $newUser} from "@/lib/store";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { useRef } from "react";
import { getUserByJID } from "@/data/api";
import { useStore } from "@nanostores/react";
const AddStudentSwipeDialog = () => {

    const [ tempJID, setTempJID ] = useState<string>("");
    const { toast } = useToast();
    const closeButton = useRef(null);
    const newUser = useStore($newUser);
    const onChangeJID = (e: ChangeEvent<HTMLInputElement>) => {
        setTempJID(e.target.value);
    }

    const onSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (e.key === "Enter") {
                setNewUserJid(tempJID);
                try {
                    const result = await getUserByJID(newUser.jid);
                    const isUnique = result === null;
                    if (!isUnique) {
                        setNewUserJid(";-1;");
                        throw new Error(`This JID already exists! Please choose a new JID, or modify this user.`);
                    }
                
                } catch (err) {
                    if ( (err as Error).message !== "User is not registered. Please see an admin.") {
                        throw err;
                    }
                }
                (closeButton.current! as HTMLButtonElement).click();
                toast({
                    variant: "default",
                    description: "JID was successfully added.",
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
                        Click to add JID!
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">
                            JID Detection
                        </DialogTitle>
                        <DialogDescription className="text-md italic">
                            Please swipe the J-Card of the student to be added.
                        </DialogDescription>
                    </DialogHeader>

                    <Input onChange={onChangeJID}
                    onKeyDown={onSubmit}>

                    </Input>
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

export default AddStudentSwipeDialog;