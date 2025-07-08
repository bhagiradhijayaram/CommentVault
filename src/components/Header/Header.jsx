import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <nav className="navigation-bar">
          <Link to="/" className="nav-link">
            <div className="website-logo-wrapper">
              <img
                src="https://res.cloudinary.com/dasvdkncm/image/upload/v1751900496/Screenshot_2025-07-07_202830-removebg-preview_r2kjrd.png"
                alt="website_logo"
                className="website-logo"
              />
              <span>wift</span>
            </div>
          </Link>
          <div className="user-profile-container">
            {/* Nagivate to Profile */}
            <Link to="/profile" className="nav-link">
              <div className="profile-wrapper">LG</div>
            </Link>
            <p>Leanne Graham</p>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
