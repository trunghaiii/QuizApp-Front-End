import { useState } from "react";
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import "./UserManagement.scss"

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
                <div className="user-manage-add">
                    <button className="btn btn-success" onClick={() => handleAddNew()}>Add New User</button>
                </div>
                <ModalCreateUser show={show} setShow={setShow} />
            </div>
        </div>
    )
}

export default UserManagement;