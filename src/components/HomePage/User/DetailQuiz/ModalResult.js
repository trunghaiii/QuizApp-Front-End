import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalResult = (props) => {
    const { show, setShow, resultData } = props;

    const handleClose = () => setShow(false);


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Result....</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total Questions: <b>{resultData.countTotal}</b></div>
                    <div>Correct Answers: <b>{resultData.countCorrect}</b></div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Show answers
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResult;