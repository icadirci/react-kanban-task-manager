import {Outlet} from "react-router-dom";


function MainLayout() {
    return (
        <div className="container">
            <Outlet/>
        </div>
    )
}

export default MainLayout;