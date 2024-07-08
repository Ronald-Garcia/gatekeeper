import { useStore } from "@nanostores/react";
import StartMenu from "./start-menu";
import { $currentPage, PAGES, $userJID } from "@/lib/store";
import SelectBudget from "./select-budget";
import InProgress from "./in-progress";


const Body = () => {
    const curPage = useStore($currentPage);

    return (
        <div className="flex justify-center items-center w-full h-full overflow-hidden">
            {(curPage === PAGES.START) && <StartMenu></StartMenu>}
            {(curPage === PAGES.BUDGET) && <SelectBudget></SelectBudget> }
            {(curPage === PAGES.IP) && <InProgress></InProgress>}
        </div>
    );
}

export default Body;