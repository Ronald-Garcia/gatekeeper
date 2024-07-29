import { useState, useEffect } from "react";
import Timer from "./timer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { $userJID, addOverride, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { OverrideTransactionType } from "@/data/types";
import { MACHINE_NAME } from "@/env";
import { getMachineByName } from "@/data/api";



const InProgress = () => {

    const userJid = useStore($userJID);

    const [time, setTime] = useState(0);
    const [machineId, setMachineId] = useState(0);
    const { toast } = useToast();
    useEffect(() => {
        const interval = setInterval(()=> {
            setTime(time => time + 1000);
        }, 1000)
        return () => {
            clearInterval(interval)
        };
    }, []);

    useEffect(()=> {
        getMachineByName(MACHINE_NAME).then(m => setMachineId(m.id));
    }, [MACHINE_NAME])

    const onSubmit = async () => {
        try {
            const override_transaction: OverrideTransactionType = { 
                timeSpent: time,
                machineUsed: machineId,
                userJid,
                date: new Date()
            };

            addOverride(override_transaction);

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