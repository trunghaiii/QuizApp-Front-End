
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postCreateNewUser } from "../../../../services/apiService"
import { toast } from 'react-toastify';


const ModalCreateUser = (props) => {
    const { show, setShow } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [preview, setPreview] = useState("");


    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreview("")
    };
    // const handleShow = () => setShow(true);

    const handleImageUpload = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            //console.log(event.target.files[0]);
        } else {
            // setPreview("")
        }

    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleCreateNewUser = async () => {

        // Validate

        let isEmailValidated = validateEmail(email);
        if (!isEmailValidated) {
            toast.error("Invalid Email !!!")
            return;
        }

        if (!password) {
            toast.error("Invalid PassWord !!!")
            return;
        }

        // call API

        let data = await postCreateNewUser(email, password, username, role, image)
        console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            props.setCurrentPage(1);
            await props.fetchListUserPaginate(1)
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal className='modal-create-user' size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Role</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option>ADMIN</option>
                                <option>USER</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className='btn-add-img' htmlFor="file">Add Image</label>
                            <input
                                type="file"
                                hidden
                                id='file'
                                onChange={(event) => handleImageUpload(event)}
                            />
                        </div>
                        <div className="col-12 img-preview">
                            {
                                preview ?
                                    <img src={preview} alt="preview-img" />
                                    :
                                    <span>Preview</span>
                            }


                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleCreateNewUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;