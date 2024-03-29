import React, { useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

// interface NavProps {
//   scrollToView: (e: React.MouseEvent<HTMLLIElement>, href: string) => void;
//   onSidebarOpen: () => void;
//   sidebarOpen: boolean;
// }
// eslint-disable-next-line no-empty-pattern
const Nav: React.FC = ({}) => {
  const nav = useRef<HTMLDivElement>(null);
  const [, setMenuOpen] = useState(false);
    
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const isSticky = () => {
      if (nav.current) {
        const navHeight = nav.current.getBoundingClientRect().height;
        const scrollTop = window.scrollY;
        if (scrollTop >= navHeight) {
          nav.current.classList.add('sticky');
        } else {
          nav.current.classList.remove('sticky');
        }
      }
    };

    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  return (
    <nav className='navbar'>
      <div className='logo-container'>
      <img src="/static/images/Logo.svg" alt='navbar-logo'/>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to='#myurls' onClick={() => scrollToSection ("myurls")}>My URLs</Link>
        </li>
        <li>
          <Link to='#features' onClick={() => scrollToSection ("features")}>Features</Link>
        </li>
        <li>
          <Link to='#pricing' onClick={() => scrollToSection ("pricing")}>Pricing</Link>
        </li>
        <li>
          <Link to='#analytics' onClick={() => scrollToSection ("analytics")}>Analytics</Link>
        </li>
        <li>
          <Link to='#faqs' onClick={() => scrollToSection ("faqs")}>FAQs</Link>
        </li>
        {/* <li>
          <Link to='#compressly' onClick={() => scrollToSection ("compressly")}>Trim URL</Link>
        </li> */}
      </ul>

      <div className="navbar-buttons">
        <Link to="/login" className="btn-login">
          Login
        </Link>
        <Link to="/signup" className="btn-signup">
          Try for free
        </Link>
      </div>
  </nav>
  );
}

export default Nav;