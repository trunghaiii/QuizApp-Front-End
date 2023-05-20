import "./Login.scss"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../../services/apiService"
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux'
import { fetch_user_login_success } from '../../../redux/slices/userSlice'
import { ImSpinner9 } from "react-icons/im";

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setisLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async () => {
        // validate

        setisLoading(true)
        // submit apis
        let data = await postLogin(email, password)
        //console.log(data);
        if (data && data.EC === 0) {
            //console.log(data);
            dispatch(fetch_user_login_success(data))
            toast.success(data.EM)
            setisLoading(false)
            navigate("/")
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
            setisLoading(false)
        }
    }
    return (
        <div className="login-container">
            <div className="header">
                Don't have an account yet?
                <button onClick={() => navigate("/register")}>Sign Up</button>
            </div>
            <div className="title col-6 mx-auto">
                Quiz App
            </div>
            <div className="welcome col-6 mx-auto">
                Halloo! Who is this?
            </div>
            <div className="login-form col-6 mx-auto">
                <label for="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="email-form form-control"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <label for="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="password-form form-control"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="forgot-password col-6 mx-auto">
                <span>Forgot Password ?</span>
            </div>
            <div className="login-btn col-6 mx-auto">
                <button
                    onClick={() => handleLogin()}
                    disabled={isLoading}
                >
                    {isLoading === true && <ImSpinner9 className="spinning" />}

                    Login to QuizApp</button>
            </div>
            <div className="back-home text-center mt-3">
                <span
                    onClick={() => navigate("/")}
                > &#60;&#60; Go to Home Page</span>
            </div>
        </div >
    )
}

export default Login