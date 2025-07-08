import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Header from "../../components/Header/Header";

import "./ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState([]);

  // fetching users data
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUserData(data[0]); // Use the first record from the users data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  });

  // get initials
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return words
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const initials = getInitials(userData.name);

  // full address from api data
  const fullAddress = `${userData?.address?.street || ""}, ${
    userData?.address?.suite || ""
  }, ${userData?.address?.city || ""}, ${userData?.address?.zipcode || ""}`;

  return (
    <>
      <Header />
      <main className="profile-container">
        <section className="profiler-wrapper">
          <h1 className="profile-heading">
            {/* Nagivate to DashBoard */}
            <Link to="/dashboard" className="nav-link">
              <FaArrowLeftLong size={18} />
            </Link>
            Welcome, {userData.name}
          </h1>
          <div className="profile-details-wrapper">
            <div className="profile-details">
              <div className="profile-logo">{initials}</div>
              <div className="user-info">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
              </div>
            </div>

            <div className="profile-info-wrapper">
              <div className="info-block">
                <label>User ID</label>
                <div>
                  <p className="info-text">123456789</p>
                </div>
              </div>
              <div className="info-block">
                <label>Name</label>
                <div>
                  <p className="info-text">{userData.name}</p>
                </div>
              </div>
              <div className="info-block">
                <label>Email ID</label>
                <div>
                  <p className="info-text">{userData.email}</p>
                </div>
              </div>
              <div className="info-block">
                <label>Address</label>
                <div>
                  <p className="comment-body info-text">{fullAddress}</p>
                </div>
              </div>
              <div className="info-block">
                <label>Phone</label>
                <div>
                  <p className="info-text">{userData.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
