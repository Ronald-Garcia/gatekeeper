import { useStore } from "@nanostores/react";
import StartMenu from "./start-menu";
import { $currentPage, PAGES, $userJID } from "@/lib/store";
import { useEffect } from "react";


const Body = () => {
    const curPage = useStore($currentPage);
    const userJID = useStore($userJID);

    useEffect(()=>{console.log(curPage);}, [curPage]);
    useEffect(()=>{console.log(userJID);}, [userJID]);
    return (
        <div className="flex justify-center items-center w-full h-full overflow-hidden">
            {(curPage === PAGES.START) && <StartMenu></StartMenu>}
            {(curPage === PAGES.SWIPE) }
        </div>
    );
}

export default Body;