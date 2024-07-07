import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { PAGES, setCurrentPage } from "@/lib/store";
import SwipeDialog from "./swipe-dialog";

const StartMenu = () => {

    return (
        <>
            <SwipeDialog></SwipeDialog>
        </>
    );
}

export default StartMenu;