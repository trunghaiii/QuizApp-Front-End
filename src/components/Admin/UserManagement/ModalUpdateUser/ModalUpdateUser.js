
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { putUpdateUser } from "../../../../services/apiService"
import { toast } from 'react-toastify';
import _ from "lodash"


const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate } = props;

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
        props.setDataUpdate({})
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


    const handleUpdateUser = async () => {
        // call API

        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        //console.log(data);

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose();
            await props.fetchListUserPaginate(props.currentPage)
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    useEffect(() => {
        //console.log(dataUpdate);
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            if (!_.isEmpty(dataUpdate.image)) {
                setPreview(`data:image/jpeg;base64,${dataUpdate.image}`)
            } else {
                setPreview("")
            }
        }

    }, [dataUpdate])

    //console.log("render");
    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal className='modal-create-user' size="xl" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update an User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                disabled
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
                        onClick={() => handleUpdateUser()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;