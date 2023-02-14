import BackgroundVideo from '../../../assets/video-homepage.mp4';
import "./Home.scss"

const Home = () => {
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
                <button className='home-content-btn'>Get started-It is Free</button>

            </div>
        </div>
    )
}

export default Home;