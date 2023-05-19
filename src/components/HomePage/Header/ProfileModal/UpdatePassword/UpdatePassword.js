import { useState } from "react"
import { postUpdatePassword } from "../../../../../services/apiService"
import { toast } from "react-toastify"


const UpdatePassword = () => {
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    const handleUpdatePassword = async () => {
        const response = await postUpdatePassword(currentPassword, newPassword);

        if (response && response.EC === 0) {
            toast.success(response.EM);
        } else {
            toast.error(response.EM)
        }

        //console.log(response);
        //alert("olalalaal")
    }

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
            <div className="mt-2">
                <button
                    className="btn btn-primary"
                    onClick={() => handleUpdatePassword()}
                >Save Password</button>
            </div>
        </div>

    )
}

export default UpdatePassword;