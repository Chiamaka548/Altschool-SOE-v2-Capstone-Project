import Nav from '../../components/Nav/Nav';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './Home.css';

const Home = () => {
    return (
        <><Nav />
            <div className="home-container">
                <div className='home-main'>
                    <div className='home-header'>
                        <span className='home-h2'>Optimize your online experience with our advanced </span>
                        <span className='special-text'>
                            <span className='highlighted'>URL Shortening</span>
                            <img src="/src/assets/images/home-underline.svg" alt='' />
                        </span>
                        <span className='home-h2'> solution</span>

                    </div>
                    <motion.p transition={{ duration: 2, ease: "easeOut"}}>
                        Personalize your shortened URLs to align with your brand identity.
                        Utilize custom slugs, branded links, and domain customization options
                        to reinforce your brand presence and enhance user engagement.
                    </motion.p>
                    <div className="button-wrapper">
                        <button className='primary-button'>
                            <Link to="/signup"> Sign Up </Link>
                        </button>
                        <button className='inverse-button'>Learn More</button>
                    </div>
                </div>
                <img src="/src/assets/images/hero-image.svg" className="hero-image" alt="hero-image" />

                <div>
                    <img src="/src/assets/images/eclipse.png" className='eclipse-img' alt='hero-image' />
                    <div className='onestop-container'>
                        <div className='onestop-main'>
                            <h1 className='onestop-text'>
                                one stop.
                                <br />
                                four
                                <span className='highlighted'> possibilities</span>
                                .
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
