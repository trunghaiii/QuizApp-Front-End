import { useState } from "react";
import ReactPaginate from "react-paginate";

const UserTablePaginate = (props) => {

    const { listUser, pageCount, currentPage } = props

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        props.setCurrentPage(Number(event.selected) + 1)
        props.fetchListUserPaginate(Number(event.selected) + 1);
        //console.log(`User requested page number ${event.selected}`);
    };

    console.log("render Table", pageCount);
    return (
        <div>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((user, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => props.handleClickBtnView(user)}
                                        >View</button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(user)}
                                        >Update</button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => { props.handleClickBtnDelete(user) }}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        })

                    }

                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'4'}>Not Found Data</td>
                        </tr>
                    }

                </tbody>
            </table>
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage - 1}
            />
        </div>

    );
}
export default UserTablePaginate;