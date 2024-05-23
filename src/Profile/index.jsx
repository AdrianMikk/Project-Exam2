import { useState, useEffect } from "react";
import CreateVenue from "../CreateBooking/index";

const Profile = () => {
  const [name] = useState("name");
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem("avatarUrl") || "");
  const [bannerUrl, setBannerUrl] = useState(localStorage.getItem("bannerUrl") || "");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [bannerUrlInput, setBannerUrlInput] = useState("");
  const [showCreateBooking, setShowCreateBooking] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
    const apiKey = import.meta.env.VITE_API_KEY;
    setApiKey(apiKey);
    if (!accessToken) {
      return;
    }

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/ole1234567?_venues=true&_bookings=true`, {
          headers: {
            'Content-Type': 'application/json',
            'x-noroff-api-key': apiKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        console.log("Profile data fetched:", data);
        if (data) {
          setAvatarUrl(data.avatar?.url || "");
          setVenues(data.venues || []);
          setBookings(data.bookings || []);
          if (data.avatar?.url) {
            localStorage.setItem("avatarUrl", data.avatar.url);
          }
          if (data.banner?.url) {
            localStorage.setItem("bannerUrl", data.banner.url);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem("avatarUrl", avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    localStorage.setItem("bannerUrl", bannerUrl);
  }, [bannerUrl]);

  const handleAvatarChange = (event) => {
    const newAvatarUrl = event.target.value;
    setImageUrlInput(newAvatarUrl);
  };

  const handleBannerChange = (event) => {
    const newBannerUrl = event.target.value;
    setBannerUrlInput(newBannerUrl);
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim() !== "") {
      setAvatarUrl(imageUrlInput);
      updateProfile({ avatar: { url: imageUrlInput, alt: "User Profile" } });
    }
  };

  const handleBannerUrlSubmit = () => {
    if (bannerUrlInput.trim() !== "") {
      setBannerUrl(bannerUrlInput);
      updateProfile({ banner: { url: bannerUrlInput } });
    }
  };
  
  const updateProfile = (updatedData) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/ole1234567`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-noroff-api-key': apiKey,
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
      console.log("Profile updated successfully:", data);
      if (data.avatar) {
        localStorage.setItem("avatarUrl", data.avatar.url);
      }
      if (data.bio) {
        localStorage.setItem("bio", data.bio);
      }
      if (data.banner) {
        localStorage.setItem("bannerUrl", data.banner.url);
      }
      setSuccessMessage("Profile updated successfully.");
      setErrorMessage("");
    })
    .catch(error => {
      console.error("Error updating profile:", error);
      setErrorMessage("Error updating profile. Please try again.");
      setSuccessMessage("");
    });
  };

  const toggleCreateBooking = () => {
    setShowCreateBooking(!showCreateBooking);
  };

  const handleLogout = () => {
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem("bio");
    localStorage.removeItem("bannerUrl");
    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <div className="w-full rounded-lg overflow-hidden bg-gray-800">
        <div className="relative">
          <img
            src={bannerUrl}
            alt="Banner"
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              className="w-24 h-24 rounded-full border-4 border-white"
              src={avatarUrl}
              alt="User Profile"
            />
          </div>
        </div>
        <div className="px-5 py-4 flex flex-col items-center">
          <h1 className="text-xl font-bold text-white mt-12 mb-2">{name}</h1>
          <button
            onClick={toggleEdit}
            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Close" : "Edit Profile"}
          </button>
          {isEditing && (
            <>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2 text-white">
                  Change Avatar (Image Address)
                </h2>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Enter Image Address"
                  value={imageUrlInput}
                  onChange={handleAvatarChange}
                />
                <button
                  onClick={handleImageUrlSubmit}
                  className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Avatar
                </button>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2 text-white">
                  Change Banner (Image Address)
                </h2>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Enter Banner Image Address"
                  value={bannerUrlInput}
                  onChange={handleBannerChange}
                />
                <button
                  onClick={handleBannerUrlSubmit}
                  className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save Banner
                </button>
              </div>
            </>
          )}
          {successMessage && (
            <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
              {errorMessage}
            </div>
          )}
          {isAuthenticated && (
            <>
              <button
                onClick={handleLogout}
                className="bg-red text-white mt-6 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
          <div className="flex justify-end mb-4">
            <button onClick={toggleCreateBooking} className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-md hover:bg-blue-600">List New Venue</button>
          </div>
          {showCreateBooking && <CreateVenue />}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Upcoming Bookings
            </h2>
            {bookings && bookings.length > 0 ? (
              <ul className="text-gray-400">
                {bookings.map((booking, index) => (
                  <li key={index}>
                    <strong>{booking.venue}</strong> - {booking.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No upcoming bookings.</p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              My Venues
            </h2>
            {venues && venues.length > 0 ? (
              <ul className="text-gray-400">
                {venues.map(venue => (
                  <li key={venue.id}>
                    <strong>{venue.name}</strong> - {venue.location.city}, {venue.location.country}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No venues listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
