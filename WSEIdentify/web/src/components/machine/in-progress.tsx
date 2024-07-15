import { useState, useEffect } from "react";
import Timer from "./timer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { $budgetCodeUsed, PAGES, setCurrentPage } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";

const InProgress = () => {

    const budgetCode = useStore($budgetCodeUsed);

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
    return (
        <>
            <Card>
                <CardHeader>
                        <CardTitle>
                            Time spent
                        </CardTitle>
                        <CardDescription>
                            Below is the amount of time that will be billed to {budgetCode}.
                        </CardDescription>
                    </CardHeader>
                <CardContent>
                    <p className="flex justify-center font-bold text-5xl">
                        <Timer time={time}></Timer>
                    </p>
                    </CardContent>
                    <CardFooter 
                        className="justify-center"
                        onClick={() => {
                            toast({
                                title: "Session finished!",
                                description: "The session was successfully finished, billing information was sent!"
                            });
                            setCurrentPage(PAGES.START);
                        }}>
                        <Button>
                            Tap when finished!
                        </Button>
                    </CardFooter>
            </Card>
        </>
    );
}

export default InProgress;