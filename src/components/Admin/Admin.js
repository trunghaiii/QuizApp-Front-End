import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./Admin.scss"
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = () => {

    const [collapsed, setCollapsed] = useState(false);

    const handleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div className="admin-container">
            <div className="side-bar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="collapse-bar">
                    <FaBars size={'2rem'} onClick={() => handleCollapse()} />
                </div>
                <div className="main-content">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )

}

export default Admin;