import { Link } from "react-router-dom";

import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <main className="home">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1751885887/Screenshot_2025-07-07_162507-removebg-preview_xai2qx.png"
          alt="website-logo"
        />
        <p className="greeting-text">Hey, I’m Swift. Welcome to my world.</p>
        {/* Nagivate to DashBoard */}
        <Link to="/dashboard">
          <button className="dashboard-button">Go to DashBoard</button>
        </Link>
      </main>
    </>
  );
};

export default HomePage;
