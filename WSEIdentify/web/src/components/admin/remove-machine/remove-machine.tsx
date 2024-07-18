import { Dialog, DialogTrigger, DialogClose, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../../ui/input";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { useRef } from "react";
import { removeMachineByName } from "@/data/api";

const RemoveMachine = () => {

    const [ tempName, setTempName ] = useState<string>("");
    const { toast } = useToast();
    const closeButton = useRef(null);

    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setTempName(e.target.value);
    }

    const onSubmitClick = async () => {
        try {
            await removeMachineByName(tempName);
            
            (closeButton.current! as HTMLButtonElement).click();
            toast({
                variant: "default",
                description: "Machine was successfully removed.",
                title: "Success! ✅"
            })
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
        
    }

    const onSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSubmitClick();
        }
    }
    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="link">
                        Remove a Machine
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Remove a Machine
                    </DialogTitle>
                    <DialogDescription className="text-md italic">
                        Please input the name of the machine to be removed.
                    </DialogDescription>
                </DialogHeader>

                <Input onChange={onChangeName}
                onKeyDown={onSubmit}
                placeholder="Name">

                </Input>
                <DialogFooter className="flex flex-row justify-end">
                <DialogClose ref={closeButton} asChild>
                    <Button
                    variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    onClick={onSubmitClick}>
                    Submit
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>

        </>
    );
}

export default RemoveMachine;