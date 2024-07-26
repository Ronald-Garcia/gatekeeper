import { useState, useEffect } from "react";
import Timer from "./timer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { $currentUser, $newBudget, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { addTransactionToDB, getMachineByName } from "@/data/api";
import { MACHINE_NAME } from "@/env";

const InProgress = () => {

    const newBudget = useStore($newBudget);

    const currentUser = useStore($currentUser);

    const [time, setTime] = useState<number>(0);
    const { toast } = useToast();
    let MACHINE_ID = -1;
    useEffect(() => {
        const interval = setInterval(()=> {
            setTime(time => time + 1000);
        }, 1000)
        return () => {
            clearInterval(interval)
        };
    }, []);
    useEffect(()=> {
        getMachineByName(MACHINE_NAME).then(m => MACHINE_ID = m.id);
    }, [MACHINE_NAME])
    const onSubmit = async () => {
        try {
            console.log(MACHINE_ID);
            await addTransactionToDB({
                timeSpent: time,
                code: newBudget.id,
                machineUsed: MACHINE_ID,
                userJHED: currentUser.jhed
            });
            
            toast({
                title: "Session finished!",
                description: "The session was successfully finished, billing information was sent!"
            });
        } catch (err) {
            toast({
                variant: "destructive",
                description: (err as Error).message,
                title: "Uh oh! Something went wrong! 😔"
            })
        }

        setCurrentPage(PAGES.START);

    }
    return (
        <>
            <Card>
                <CardHeader>
                        <CardTitle>
                            Time spent
                        </CardTitle>
                        <CardDescription>
                            Below is the amount of time that will be billed to {newBudget.alias}.
                        </CardDescription>
                    </CardHeader>
                <CardContent>
                    <div className="flex justify-center font-bold text-5xl">
                        <Timer time={time}></Timer>
                    </div>
                    </CardContent>
                    <CardFooter 
                        className="justify-center"
                        onClick={onSubmit}>
                        <Button>
                            Tap when finished!
                        </Button>
                    </CardFooter>
            </Card>
        </>
    );
}

export default InProgress;