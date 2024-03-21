import Nav from '../../components/Nav/Nav';
import Features from "../../components/Features/Features";
import Pricing from "../../components/Pricing/Pricing";
import Compressly from "../../components/Compressly/Compressly";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import './Home.css';
import FAQs from '../../components/FAQs/FAQs';
import Footer from "../../components/Footer/Footer";

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
                            <div className='data-container'>
                                <div className='data-main'>
                                    <h4>3M</h4>
                                    <p>Active users</p>
                                </div>
                                <div className='data-main'>
                                    <h4>60M</h4>
                                    <p>
                                        Links & QR
                                        <br />
                                        codes created
                                    </p>
                                </div>
                                <div className='data-main'>
                                    <h4>1B</h4>
                                    <p>
                                        Cicked & Scanned
                                        <br />
                                        connections
                                    </p>
                                </div>
                                <div className='data-main'>
                                    <h4>300k</h4>
                                    <p>App Integrations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='features'>
                <Features />
            </div>
            <div id="pricing">
                <Pricing />
            </div>
            <div id="compressly">
                <Compressly />
            </div>
            <div id='faqs'>
                <FAQs />
            </div>
            <div id='footer'>
                <Footer />
            </div>
        </>
    );
}

export default Home;
