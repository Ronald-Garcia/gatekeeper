import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { addUserToDB, createRelation } from "@/data/api";
import { $newRelationList, $newUser, invalidNewUser } from "@/lib/store";
import { useStore } from "@nanostores/react";


const AddStudentConfirmation = () => {

    const { toast } = useToast();

    const newUser = useStore($newUser);
    const newRelations = useStore($newRelationList);

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
            await addUserToDB(newUser);
            newRelations.forEach(async r => await createRelation(r.jid, r.budgetId));
            toast({
                variant: "default",
                description: `${newUser.firstname} was successfully added.`,
                title: "Success! ✅"
            })
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            });
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
                        Are you sure you want to add {newUser.firstname} {newUser.lastname} to the system?
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

export default AddStudentConfirmation;