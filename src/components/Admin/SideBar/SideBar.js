
import 'react-pro-sidebar/dist/css/styles.css';
import { Link, useNavigate } from "react-router-dom"

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub, } from 'react-icons/fa';
import { DiReact } from 'react-icons/di'
import sidebarBg from '../../../assets/bg2.jpg';

const SideBar = ({ collapsed, toggled, handleToggleSidebar }) => {
    const navigate = useNavigate()

    return (
        <ProSidebar
            image={sidebarBg}
            collapsed={collapsed}
            toggled={toggled}

            breakPoint={collapsed === true ?
                "md"
                :
                ""
            }
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {<DiReact size={'3rem'} color={"#3495F1"} />}
                    <span onClick={() => navigate("/")}>Quiz</span>

                </div>
            </SidebarHeader>

            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem
                        icon={<FaTachometerAlt />}
                        suffix={<span className="badge red">main</span>}
                    >
                        <Link to="/admin">Dash Board</Link>
                    </MenuItem>
                </Menu>
                <Menu iconShape="circle">
                    <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        title={"Content"}
                        icon={<FaGem />}
                    >
                        <MenuItem><Link to="/admin/user">User Management</Link></MenuItem>
                        <MenuItem><Link to="/admin/manage-quiz"> Quizs Management</Link></MenuItem>
                        <MenuItem><Link to="/admin/manage-question"> Questions Management</Link></MenuItem>

                    </SubMenu>

                </Menu>
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="https://github.com/trunghaiii"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                        <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            View
                        </span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default SideBar;