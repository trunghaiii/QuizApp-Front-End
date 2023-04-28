
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash'

import "./ModalUpdateQuiz.scss"
import { putUpdateQuiz } from "../../../../services/apiService"
import { toast } from 'react-toastify';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate } = props;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");

    const handleClose = () => {
        setShow(false)
        props.setDataUpdate({})
    }

    const handleUploadImage = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            //console.log(event.target.files[0]);
        } else {
            // setPreview("")
        }
    }

    const handleSubmitUpdate = async () => {
        let response = await putUpdateQuiz(dataUpdate.id, name, description, difficulty, image);
        if (response && response.EC === 0) {
            toast.success(response.EM)
            handleClose()
            props.fetchAllQuiz()
        } else {
            toast.error(response.EM)
        }


    }

    useEffect(() => {
        //console.log('use effect');
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description)
            setDifficulty(dataUpdate.difficulty)
            if (dataUpdate.image) {
                setPreview(`data:image/jpeg;base64,${dataUpdate.image}`)
            } else {
                setPreview("")
            }

        }
    }, [dataUpdate])

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                autoFocus
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Difficulty</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                value={difficulty}
                                onChange={(event) => setDifficulty(event.target.value)}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Upload Image</Form.Label>
                            <Form.Control
                                type="file"
                                size="lg"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </Form.Group>
                        <div className='preview-img'>
                            {preview
                                ?
                                <img src={preview} />
                                :
                                <span>preview Image</span>
                            }

                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => handleClose()} variant="secondary" >
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleSubmitUpdate()}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalUpdateQuiz;