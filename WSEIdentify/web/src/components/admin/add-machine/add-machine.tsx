import { Input } from "../../ui/input";
import { ChangeEvent } from "react";
import { setNewMachineName, setNewMachineRate, invalidNewMachine, $newMachine } from "@/lib/store";
import { Button } from "../../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { addMachineToDB } from "@/data/api";
import { useStore } from "@nanostores/react";

const AddMachineDialog = () => {

    const { toast } = useToast();
    const newMachine = useStore($newMachine);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewMachineName(e.target.value);
    }
    const onChangeRate = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const num = parseInt(e.target.value);
            if (Number.isNaN(num)) {
                e.preventDefault();
                throw new Error();
            }
            setNewMachineRate(num);
        } catch (err) {
            e.preventDefault();
            toast({
                variant: "destructive",
                title: "Invalid input!",
                description: "Only include numbers! (No need for a dollar sign)"
            });
        }
    }

    const onSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (invalidNewMachine()) {
                e.preventDefault();
                throw new Error("Not enough information provided! Please double check required fields.");
            }
            await addMachineToDB(newMachine.name, newMachine.rate);

            toast({
                variant: "default",
                description: `Machine was successfully added.`,
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


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link">
                        Add a Machine
                    </Button>
                </DialogTrigger>
                <DialogContent className="space-y-2">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold">
                            Adding a new Machine
                        </DialogTitle>
                        <DialogDescription className="italic">
                            This page is to add a new machine.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <p className="text-sm font-medium">
                            Machine Information.
                        </p>
                        <p className="text-[9pt] italic">
                            Input the machine's name and hourly rate to add them to the system.
                        </p>
                    </div>

                    <div className="flex flex-row space-x-5">
                        <Input placeholder="Name"
                        onChange={onChangeName}>
                        </Input>
                        <Input placeholder="Rate"
                        onChange={onChangeRate}>
                        </Input>

                    </div>
                <DialogFooter className="flex flex-row justify-end space-x-3">
                    <DialogClose asChild>
                        <Button variant="secondary">
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

export default AddMachineDialog;