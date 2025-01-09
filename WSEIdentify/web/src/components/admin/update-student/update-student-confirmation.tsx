import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { createBudgetRelation, createMachineRelation, deleteBudgetRelation, deleteMachineRelation, updateUserToDB } from "@/data/api";
import { $newBudgetRelationList, $newUser, $budgetRelationsToDelete, invalidNewUser, $machineRelationsToDelete, $newMachineRelationList } from "@/lib/store";
import { useStore } from "@nanostores/react";


const UpdateStudentConfirmation = () => {

    const { toast } = useToast();

    const newUser = useStore($newUser);
    const newBudgetRelations = useStore($newBudgetRelationList);
    const newMachineRelations = useStore($newMachineRelationList);
    const budgetRelationsToDelete = useStore($budgetRelationsToDelete);
    const machineRelationsToDelete = useStore($machineRelationsToDelete);

    const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            if (invalidNewUser()) {
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
            await updateUserToDB(newUser);
            newBudgetRelations.forEach(async r => await createBudgetRelation(r.jid, r.budgetId));
            budgetRelationsToDelete.forEach(async r => await deleteBudgetRelation(r.jid, r.budgetId));
            newMachineRelations.forEach(async r => await createMachineRelation(r.jid, r.machineId));
            machineRelationsToDelete.forEach(async r => await deleteMachineRelation(r.jid, r.machineId));

            toast({
                variant: "default",
                description: `${newUser.firstname} was successfully updated.`,
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
                        Are you sure you want to update {newUser.firstname} {newUser.lastname}'s account?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row space-x-3">
                    <DialogClose asChild>
                        <Button variant="secondary">
                            Wait...
                        </Button>
                    </DialogClose>
                    <DialogClose>
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

export default UpdateStudentConfirmation;