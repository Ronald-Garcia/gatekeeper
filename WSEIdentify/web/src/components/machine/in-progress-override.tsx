import { useState, useEffect } from "react";
import Timer from "./timer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { $userJID, addOverride, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { OverrideTransactionType } from "@/data/types";
import { MACHINE_NAME } from "@/env";
import { lockMachine } from "@/data/api";



const InProgress = () => {

    const userJid = useStore($userJID);

    const [time, setTime] = useState(0);
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
            const override_transaction: OverrideTransactionType = { 
                timeSpent: time,
                machineUsed: MACHINE_NAME,
                userJid,
                date: new Date()
            };

            addOverride(override_transaction);

            const data = await lockMachine();
            console.log(data);
            if (data.message.startsWith("e")) {
                throw new Error("Could not lock machine! Please see staff to turn off machine.")
            }
            
            setCurrentPage(PAGES.IP)    
            
            toast({
                title: "Session finished!",
                description: "The session was successfully finished, billing information was sent!"
            });

            toast({
                title: "Session finished!",
                description: "The session was successfully finished, billing information was stored!"
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
                            OVERRIDE MODE: This information will be stored locally.
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