import { useState, useEffect } from "react";
import Timer from "./timer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { $currentUser, $newBudget, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { TransactionType } from "@/data/types";
import { addTransactionToDB } from "@/data/api";

const InProgress = () => {

    const newBudget = useStore($newBudget);

    const currentUser = useStore($currentUser);

    const [time, setTime] = useState<number>(0);
    const { toast } = useToast();

    useEffect(() => {
        const interval = setInterval(()=> {
            setTime(time => time + 1000);
        }, 1000)
        return () => {
            clearInterval(interval)
        };
    }, []);

    const onSubmit = async () => {
        try {
            const transaction: TransactionType = await addTransactionToDB({
                timeSpent: time,
                code: newBudget.id,
                machineUsed: 1,
                userJHED: currentUser.jhed
            });
    
            console.log(transaction);
            
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
                    <p className="flex justify-center font-bold text-5xl">
                        <Timer time={time}></Timer>
                    </p>
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