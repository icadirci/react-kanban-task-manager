import {Outlet} from "react-router-dom";
import Header from "../components/Header";


function AdminLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default AdminLayout;