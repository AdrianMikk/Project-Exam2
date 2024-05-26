import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateVenue from "../CreateBooking/index";
import UpcomingBookings from "../UpcomingBookings/index";
import UpdateVenue from "../UpdateVenue";
import MyVenueBookings from "../viewMyVenueBookings";

const Profile = () => {
  const { name } = useParams();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [bannerUrlInput, setBannerUrlInput] = useState("");
  const [showCreateBooking, setShowCreateBooking] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isVenueManager, setIsVenueManager] = useState(localStorage.getItem("isVenueManager") === "true");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
    
    const apiKey = import.meta.env.VITE_API_KEY;
    setApiKey(apiKey);
  
    if (!accessToken) return;
  
    const fetchUserData = async () => {
      const user = localStorage.getItem('user');
      if (!user) {
        console.error("No user data found in localStorage.");
        return;
      }
  
      const userObject = JSON.parse(user);
      const userName = userObject?.data?.name;
  
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Noroff-api-key': apiKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data) {
          if (data.data.venueManager) {
            setIsVenueManager(true);
            localStorage.setItem("isVenueManager", "true");
          } else {
            setIsVenueManager(false);
            localStorage.setItem("isVenueManager", "false");
          }
          // Set avatar and banner URLs
          setAvatarUrl(data.data.avatar?.url || "");
          setBannerUrl(data.data.banner?.url || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
  
    fetchUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("isVenueManager", isVenueManager);
  }, [isVenueManager]);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
    const apiKey = import.meta.env.VITE_API_KEY;
    setApiKey(apiKey);

    if (!accessToken) return;

    const fetchProfileData = async () => {
      const user = localStorage.getItem('user');
      const userObject = JSON.parse(user);
      const userName = userObject.data.name;

      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}?_venues=true&_bookings=true`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Noroff-api-key': apiKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        if (data) {
          setAvatarUrl(data.data.avatar?.url || "");
          setBannerUrl(data.data.banner?.url || "");
          setVenues(data.data.venues || []);
          setBookings(data.data.bookings || []);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [apiKey, name]);

  // Handling changes and submissions for avatar and banner URLs
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

  // Function to update profile
  const updateProfile = (updatedData) => {
    const accessToken = localStorage.getItem('accessToken');
    const userName = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).data.name : null;
    if (!accessToken) {
      console.error("User is not authenticated");
      return;
    }
    fetch(`https://v2.api.noroff.dev/holidaze/profiles/${userName}`, {
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
      if (data.data.avatar) {
        setAvatarUrl(data.data.avatar.url);
      }
      if (data.data.banner) {
        setBannerUrl(data.data.banner.url);
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

  // Function to toggle the visibility of the CreateBooking component
  const toggleCreateBooking = () => {
    setShowCreateBooking(!showCreateBooking);
  };

  const toggleEditVenue = (venueId) => {
    setEditingVenueId(venueId === editingVenueId ? null : venueId);
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Function to toggle edit mode
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
          <button
            onClick={toggleEdit}
            className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {isEditing ? "Close" : "Edit Profile"}
          </button>
          {isEditing && (
            <>
              <div className="mt-4">
                <label htmlFor="avatar" className="text-lg font-semibold mb-2 text-white">Enter Avatar Image Address</label>
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
                <label htmlFor="change-avatar" className="text-lg font-semibold mb-2 text-white">Enter Banner Image Address</label>
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
                className="bg-red text-black mt-6 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </>
          )}
          <div className="flex justify-end mb-4">
            <button onClick={toggleCreateBooking} className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-md hover:bg-blue-600">List New Venue</button>
          </div>
          {showCreateBooking && <CreateVenue />}
          {UpcomingBookings(bookings)}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-white">My Venues</h2>
            <div className="grid grid-cols-1 gap-4">
              {venues && venues.length > 0 ? (
                venues.map(venue => (
                  <div key={venue.id}>
                    <div className="flex items-center bg-gray-800 rounded-lg p-4">
                      <img
                        src={venue.media[0].url}
                        alt={venue.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <a href={`/venues/${venue.id}`} className="text-lg font-semibold text-white hover:bg-blue-600">
                          {venue.name}
                        </a>
                        <p className="text-gray-300 pr-2">{venue.location.city}, {venue.location.country}</p>
                      </div>
                      <button onClick={() => toggleEditVenue(venue.id)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Edit Venue
                      </button>
                    </div>
                    <div className="mt-8 flex justify-center cols-span-2">
                      {editingVenueId === venue.id && <UpdateVenue venueDetails={venue} />}
                    </div>
                    <div className="mt-4">
                      <MyVenueBookings id={venue.id} />
                  </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 mt-2">No venues listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
