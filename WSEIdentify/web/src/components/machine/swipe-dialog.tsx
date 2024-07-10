import { 
    Dialog, 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogTitle, 
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { $userJID, PAGES, setCurrentPage, setUserJID } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useStore } from "@nanostores/react";
import { getUserByJID } from "@/data/api"; 
import { setUser } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
const SwipeDialog = () => {

    const { toast } = useToast();

    const userJID = useStore($userJID);
    
    const closeButton = useRef(null);
    const handleKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserJID((e.target as HTMLInputElement).value);
    }

    const submitJHID = async () => {
        try {
            const user = await getUserByJID(userJID);
            if (!user) {
                throw new Error("Error! User not found!");
            }
            setUser(user);   
            if (user.admin) {
                toast({
                    title: "Admin detected.",
                    description: "Would you like to open the admin page?",
                    action: (
                        <ToastAction altText="Confirm" onClick={()=> {setCurrentPage(PAGES.ADMIN_START)}}>Yes!</ToastAction>
                    )
                })
            }

            const budgetsOfUser = Object.values(user.budgetCodes);
            if (budgetsOfUser.length === 0) {
                throw new Error("It appears you have no budgets! Please see an admin to add a budget.");
            }  
            setCurrentPage(PAGES.BUDGET);
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[50%] h-[50%] border-4 border-stone-400"
                >
                    <p className="text-5xl text-wrap font-bold text-stone-700">
                        Tap to start!
                    </p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Verification
                </DialogTitle>
                <DialogDescription>
                    Please swipe your J-Card to verify your identity.
                </DialogDescription>
                <div className="flex w-full  justify-center align-center">
                    <Input 
                    onChange={handleKeyboard}
                    onKeyDown={(e)=>{
                        if (e.key === "Enter") {
                            e.preventDefault();
                            (closeButton.current! as HTMLButtonElement).click();
                        }
                    }}
                    className="self-center">
                    </Input>

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            ref={closeButton}
                            onClick={submitJHID}>
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

            
        </Dialog>
    );
}

export default SwipeDialog;