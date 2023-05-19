import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./ProfileModal.scss"
import profileImg from "../../../../assets/profile.jpg"
import UpdateProfile from './UpdateProfile/UpdateProfile';
import UpdatePassword from './UpdatePassword/UpdatePassword';


function ProfileModal(props) {
    const { show, setShow, account } = props;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className='general-detail-profile'>
                        {account && account.image
                            ?
                            <div className='detail-img'>
                                <img src={`data:image/png;base64,${account.image}`} alt="profile-img" />
                            </div>
                            :
                            <div className='detail-img'>
                                <img src={profileImg} alt="profile-img" />
                            </div>
                        }

                        <div className='detail-username'>{account.username}</div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="profile" title="Update Profile">
                            <UpdateProfile />
                        </Tab>
                        <Tab eventKey="password" title="Update Password">
                            <UpdatePassword />
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ProfileModal;