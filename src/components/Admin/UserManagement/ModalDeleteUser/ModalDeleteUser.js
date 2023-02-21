import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete } = props;

    const handleClose = () => setShow(false);

    const handleDeleteUser = () => {
        alert("Delete")
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete the user with email:
                    <b>{dataDelete && dataDelete.email ? dataDelete.email : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className='btn btn-danger' variant="primary" onClick={() => { handleDeleteUser() }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;