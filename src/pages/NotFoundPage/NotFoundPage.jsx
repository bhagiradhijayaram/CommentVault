import { Link } from "react-router-dom";

import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <>
      <section className="not-foundpage-wrapper">
        <img
          src="https://res.cloudinary.com/dasvdkncm/image/upload/v1751885887/Screenshot_2025-07-07_162507-removebg-preview_xai2qx.png"
          alt="website-logo"
        />
        <p className="greeting-text">
          Hey, I’m Swift. Page not found - please go to the dashboard page.
        </p>
        {/* Nagivate to DashBoard */}
        <Link to="/dashboard">
          <button className="dashboard-button">Go to DashBoard</button>
        </Link>
      </section>
    </>
  );
};

export default NotFoundPage;
