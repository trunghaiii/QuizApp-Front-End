import "./Register.scss"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { toast } from 'react-toastify';
import { postRegisterUser } from "../../../services/apiService"


const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        // validate data
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('Invalid email')
            return;
        }

        if (!password) {
            toast.error('Invalid password')
            return;
        }

        // call API

        let data = await postRegisterUser(email, password, username);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        }

        if (data && Number(data.EC) !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <div className="register-container">
            <div className="register-header">
                <span>Already have an account?</span>
                <button onClick={() => navigate("/login")}>Log in</button>
            </div>
            <div className="register-content">
                <h3 className="title">Quiz App</h3>
                <p className="text">Start Your Journey</p>
                <div className="mb-3">
                    <label for="email" className="">Email</label>
                    <div class="col-12">
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                </div>
                <div className="mb-3 password-group">
                    <label for="pass" className="">Password</label>
                    <div className="col-12 password-input">
                        <input
                            type={isShowPassword ? "text" : "password"}
                            className="form-control"
                            id="pass"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <span
                            onClick={() => setIsShowPassword(!isShowPassword)}
                        >{isShowPassword ? <VscEye /> : <VscEyeClosed />}</span>
                    </div>
                </div>
                <div className="mb-3">
                    <label for="name" className="">Username</label>
                    <div class="col-12">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                </div>
                <div className="btn-register">
                    <button onClick={() => handleRegister()}>Create My Account</button>
                </div>
                <div className="back-home">
                    <span onClick={() => navigate("/")}>Back To Home Page</span>
                </div>
            </div>

        </div>
    )
}

export default Register