import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PrivateRouteUser = (props) => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const account = useSelector((state) => state.user.account)

    //console.log(account);
    if (isAuthenticated === false) {
        toast.error("You need to Login to access User section")
        return (
            <Navigate to="/login" />
        )
    }

    if (account.role === "ADMIN") {
        toast.error("You are not allowed to access User section")
        return (
            <Navigate to="/" />
        )
    }

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRouteUser;