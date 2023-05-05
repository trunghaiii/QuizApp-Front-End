import Header from "./Header/Header";
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="header">
                <Header />
            </div>
            <div className="home-page-content">

                <Outlet />

            </div>

        </div>
    )
}

export default HomePage;