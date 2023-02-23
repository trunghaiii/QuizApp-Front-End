import "./Login.scss"

const Login = () => {
    return (
        <div className="login-container">
            <div className="header">
                Don't have an account yet?
            </div>
            <div className="title col-3 mx-auto">
                Quiz App
            </div>
            <div className="welcome col-3 mx-auto">
                Halloo! Who is this?
            </div>
            <div className="login-form col-3 mx-auto">
                <label for="email" className="form-label">Email</label>
                <input type="email" className="email-form form-control" id="email" />

                <label for="password" className="form-label">Password</label>
                <input type="password" className="password-form form-control" id="password" />
            </div>
            <div className="forgot-password col-3 mx-auto">
                <span>Forgot Password ?</span>
            </div>
            <div className="login-btn col-3 mx-auto">
                <button>Login to QuizApp</button>
            </div>
        </div>
    )
}

export default Login