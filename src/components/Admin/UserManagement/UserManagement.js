
import ModalCreateUser from "./ModalCreateUser/ModalCreateUser";
import "./UserManagement.scss"
import UserTable from "./UserTable/UserTable";
import { useEffect, useState } from "react";
import { getAllUsers, getAllUsersPaginate } from "../../../services/apiService"
import ModalUpdateUser from "./ModalUpdateUser/ModalUpdateUser";
import ModalViewUser from "./ModalViewUser/ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser/ModalDeleteUser";
import UserTablePaginate from "./UserTablePaginate/UserTablePaginate";

const UserManagement = () => {

    const LIMIT_USER_PER_PAGE = 5;

    const [showModalCreate, setShowModalCreate] = useState(false)
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [showModalView, setShowModalView] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})
    const [dataDelete, setDataDelete] = useState({})
    const [listUser, setListUser] = useState([])
    const [pageCount, setPageCount] = useState(0)

    const handleAddNew = () => {
        setShowModalCreate(true);
    }

    useEffect(() => {
        fetchListUserPaginate(1)
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const fetchListUserPaginate = async (page) => {
        let res = await getAllUsersPaginate(page, LIMIT_USER_PER_PAGE);
        if (res.EC === 0) {
            //console.log(res.DT.users);
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages)
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

    const handleClickBtnDelete = (user) => {
        setShowModalDelete(true);
        setDataDelete(user)
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
                    {/* <UserTable
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}

                    <UserTablePaginate
                        listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        pageCount={pageCount}
                        fetchListUserPaginate={fetchListUserPaginate}
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
                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                />
            </div>
        </div>
    )
}

export default UserManagement;