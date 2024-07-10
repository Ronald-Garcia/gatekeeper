import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { addBudgetToDB } from "@/data/api";
import { $newBudget, invalidNewBudget } from "@/lib/store";
import { useStore } from "@nanostores/react";


const AddBudgetConfirmation = () => {

    const { toast } = useToast();

    const newBudget = useStore($newBudget);

    const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (invalidNewBudget()) {
                e.preventDefault();
                throw new Error("Not enough information provided! Please double check required fields.");
            }
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
    }

    const onYesClick = async () => {
        try {
            await addBudgetToDB(newBudget);
            toast({
                variant: "default",
                description: `Budget was successfully added.`,
                title: "Success! ✅"
            })
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            });
            console.log(err);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={onSubmitClick}>
                    Submit!
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you sure?
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to add this budget to the system?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row space-x-3">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            Wait...
                        </Button>
                    </DialogClose>
                        <DialogClose asChild>
                            <Button
                            onClick={onYesClick}>
                                Yes!
                            </Button>

                        </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddBudgetConfirmation;