import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { createRelation, deleteRelation, updateUserToDB } from "@/data/api";
import { $newRelationList, $newUser, $relationsToDelete, invalidNewUser } from "@/lib/store";
import { useStore } from "@nanostores/react";


const UpdateStudentConfirmation = () => {

    const { toast } = useToast();

    const newUser = useStore($newUser);
    const newRelations = useStore($newRelationList);
    const relationsToDelete = useStore($relationsToDelete);

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
            newRelations.forEach(async r => await createRelation(r.jid, r.budgetId));
            relationsToDelete.forEach(async r => await deleteRelation(r.jid, r.budgetId));

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