import { useStore } from "@nanostores/react";
import StartMenu from "./machine/start-menu";
import { $currentPage, PAGES } from "@/lib/store";
import SelectBudget from "./machine/select-budget";
import InProgress from "./machine/in-progress";
import AdminStart from "./admin/admin-start";
import AddStudent from "./admin/add-student/add-student";
import UpdateStudent from "./admin/update-student/update-student";


const Body = () => {
    const curPage = useStore($currentPage);

    return (
        <div className="flex justify-center items-center w-full h-full overflow-hidden">
            {(curPage === PAGES.START) && <StartMenu></StartMenu>}
            {(curPage === PAGES.BUDGET) && <SelectBudget></SelectBudget> }
            {(curPage === PAGES.IP) && <InProgress></InProgress>}
            {(curPage === PAGES.ADMIN_START) && <AdminStart></AdminStart>}
            {(curPage === PAGES.ADMIN_ADD_STUDENT) && <AddStudent></AddStudent>}
            {(curPage === PAGES.ADMIN_UPDATE_STUDENT) && <UpdateStudent></UpdateStudent>}
        </div>
    );
}

export default Body;