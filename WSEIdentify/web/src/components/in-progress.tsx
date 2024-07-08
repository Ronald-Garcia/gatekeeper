import { useState, useEffect } from "react";
import Timer from "./timer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { $budgetCodeUsed } from "@/lib/store";
import { useStore } from "@nanostores/react";
import { Button } from "./ui/button";

const InProgress = () => {

    const budgetCode = useStore($budgetCodeUsed);

    const [time, setTime] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(()=> {
            setTime(time => time + 1000);
        }, 1000)
        console.log(time);
        return () => {
            clearInterval(interval)
        };
    }, []);
    return (
        <>
            <Card>
                <CardContent>
                    <CardHeader>
                        <CardTitle>
                            Time spent
                        </CardTitle>
                        <CardDescription>
                            Below is the amount of time that will be billed to {budgetCode}.
                        </CardDescription>
                    </CardHeader>
                    <p className="flex justify-center font-bold text-5xl">
                        <Timer time={time}></Timer>
                    </p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Button>
                            Tap when finished!
                        </Button>
                    </CardFooter>
            </Card>
        </>
    );
}

export default InProgress;