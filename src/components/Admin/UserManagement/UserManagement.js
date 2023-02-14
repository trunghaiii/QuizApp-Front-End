import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import "./UserManagement.scss"
import UserTable from "./UserTable/UserTable";

const UserManagement = () => {

    const [show, setShow] = useState(false)

    const handleAddNew = () => {
        setShow(true);
    }
    return (
        <div className="user-manage-container">
            <div className="user-manage-title">
                <h3>User Management</h3>
            </div>
            <div className="user-manage-content">
                <div className="user-manage-add mb-3">
                    <button className="btn btn-success" onClick={() => handleAddNew()}>Add New User</button>
                </div>
                <div className="user-manage-table">
                    <UserTable />
                </div>
                <ModalCreateUser show={show} setShow={setShow} />
            </div>
        </div>
    )
}

export default UserManagement;