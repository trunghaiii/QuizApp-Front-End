import { useState } from "react"


const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    return (
        <div className="updateProfile-container">
            <div className="current-password">
                <label className="form-label">Current Password</label>
                <input
                    type="text"
                    className="form-control"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                />
            </div>
            <div className="old-password">
                <label className="form-label">New Password</label>
                <input
                    type="text"
                    className="form-control"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
            </div>
            <div className="mt-2"><button className="btn btn-primary">Save Password</button></div>
        </div>

    )
}

export default UpdatePassword;