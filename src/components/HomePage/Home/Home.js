import BackgroundVideo from '../../../assets/video-homepage.mp4';
import "./Home.scss"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const Home = () => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <video className='videoTag' autoPlay loop muted>
                <source src={BackgroundVideo} type='video/mp4' />
            </video>
            <div className='home-content'>
                <span className='home-content-title'>There's a better way to ask</span>
                <span className='home-content-text'>You don't want to make a boring form.
                    And your audience won't answer one.
                    Create a typeform instead—and make everyone happy.</span>
                {isAuthenticated === false ?
                    <button className='home-content-btn' onClick={() => navigate("/login")}>Get started-It is Free</button>
                    :
                    <button className='home-content-btn' onClick={() => navigate("/user")}>Doing Quiz Now</button>
                }

            </div>
        </div>
    )
}

export default Home;