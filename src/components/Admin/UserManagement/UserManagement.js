
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import "./UserManagement.scss"
import UserTable from "./UserTable/UserTable";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser/ModalUpdateUser";
import ModalViewUser from "./ModalViewUser/ModalViewUser";

const UserManagement = () => {

    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalView, setShowModalView] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({})
    const [listUser, setListUser] = useState([])

    const handleAddNew = () => {
        setShowModalCreate(true);
    }

    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) => {
        setShowModalView(true);
        setDataUpdate(user);
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
                    <UserTable
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreate}
                    setShow={setShowModalCreate}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                    fetchListUser={fetchListUser}
                />
                <ModalViewUser
                    show={showModalView}
                    setShow={setShowModalView}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />
            </div>
        </div>
    )
}

export default UserManagement;