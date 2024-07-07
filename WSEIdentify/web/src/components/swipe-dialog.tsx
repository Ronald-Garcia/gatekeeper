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
import { setUserJID } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useRef } from "react";


const SwipeDialog = () => {

    const closeButton = useRef(null);
    const handleKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserJID((e.target as HTMLInputElement).value);
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
                            ref={closeButton}>
                            Submit
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>

            
        </Dialog>
    );
}

export default SwipeDialog;