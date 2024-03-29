import { useState } from "react"
import "./UpdateProfile.scss"
import { postUpdateProfile } from "../../../../../services/apiService"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { user_update_profile_success } from "../../../../../redux/slices/userSlice"

const UpdateProfile = (props) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('')
    const [profileImg, setProfileImg] = useState('')

    //const { username, setUsername, profileImg, setProfileImg } = props
    const [previewImg, setPreviewImg] = useState('')

    const handleUpdateImg = (event) => {
        if (event && event.target && event.target.files && event.target.files[0]) {
            setProfileImg(event.target.files[0])
            setPreviewImg(URL.createObjectURL(event.target.files[0]))
        }
    }

    const handleUpdateProfile = async () => {
        const response = await postUpdateProfile(username, profileImg);

        if (response && response.EC === 0) {
            dispatch(user_update_profile_success(response.DT))
            toast.success(response.EM)
        } else {
            toast.error(response.EM)
        }
        //console.log(response);
        // alert("mem")
    }

    return (
        <div className="updateProfile-container">
            <div className="username">
                <label className="form-label">New User Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="image mt-3">
                <label className="form-label">Choose new profile image file</label>
                <input
                    className="form-control"
                    type="file"
                    onChange={(event) => handleUpdateImg(event)}
                />
            </div>
            <div className="preview-profile-img">
                {
                    previewImg
                        ?
                        <img src={previewImg} alt="preview-img" />
                        :
                        <span>Preview-Profile-Picture</span>
                }
            </div>
            <div className="mt-2">
                <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateProfile()}
                >Save Profile</button>
            </div>
        </div>
    )
}

export default UpdateProfile;