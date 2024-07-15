import { DialogClose, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { useRef } from "react";
import { removeUserByJID } from "@/data/api";
import { useStore } from "@nanostores/react";
import { $userJID } from "@/lib/store";

const RemoveStudent = () => {

    const userJID = useStore($userJID);

    const [ tempJID, setTempJID ] = useState<string>("");
    const { toast } = useToast();
    const closeButton = useRef(null);

    const onChangeJID = (e: ChangeEvent<HTMLInputElement>) => {
        setTempJID(e.target.value);
    }

    const onSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (e.key === "Enter") {
                try {
                    const actualID = parseInt(tempJID.substring(1, tempJID.length - 1));

                    console.log(actualID);
                    console.log(userJID);
                    if (actualID === userJID) {
                        throw new Error("You are trying to delete yourself... please use another account to do so.");
                    }
                    await removeUserByJID(actualID);
                    
                } catch (err) {
                    throw err;
                }
                (closeButton.current! as HTMLButtonElement).click();
                toast({
                    variant: "default",
                    description: "User was successfully removed.",
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        JID Detection
                    </DialogTitle>
                    <DialogDescription className="text-md italic">
                        Please swipe the J-Card of the student to be removed.
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
        </>
    );
}

export default RemoveStudent;