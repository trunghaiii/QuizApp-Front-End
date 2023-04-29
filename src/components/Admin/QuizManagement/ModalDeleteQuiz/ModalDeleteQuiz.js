import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiService';
import { toast } from "react-toastify"

const ModalDeleteQuiz = (props) => {
    let { show, setShow, quizId } = props;

    const handleClose = () => {
        setShow(false)
    }

    const handleDeleteConfirm = async () => {
        let data = await deleteQuiz(quizId);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            props.fetchAllQuiz()
            handleClose()
        } else {
            toast.error(data.EM)
        }
        //alert("oklllllllllllll")
    }
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are You sure you want to delete the quiz with id = {quizId}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleDeleteConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalDeleteQuiz;