import { useState, useEffect } from "react";
import CreateVenue from "../CreateBooking/index";

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(() => {
    return localStorage.getItem("avatarUrl") || "https://v2.api.noroff.dev/holidaze/profiles";
  });

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [showCreateBooking, setShowCreateBooking] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [venues, setVenues] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    setIsAuthenticated(!!accessToken);
    if (!accessToken) {
      return;
    }

    const fetchProfileData = async () => {
      try {
        const name = localStorage.getItem('username'); 
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/profiles/${name}?_venues=true&_bookings=true`, {
          headers: {
            'Content-Type': 'application/json',
            'x-noroff-api-key': apiKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setVenues(data.venues); 
        setBookings(data.bookings); 
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    localStorage.setItem("avatarUrl", avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    const bookingStatus = localStorage.getItem('bookingStatus');
    if (bookingStatus) {
      setBookings(prevBookings => [...prevBookings, JSON.parse(bookingStatus)]);
    }
  }, []);

  const handleAvatarChange = (event) => {
    const newAvatarUrl = event.target.value;
    setImageUrlInput(newAvatarUrl);
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim() !== "") {
      setAvatarUrl(imageUrlInput);
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.error("User is not authenticated");
        return;
      }
      fetch(`https://v2.api.noroff.dev/holidaze/profiles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-noroff-api-key': apiKey,
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          avatar: {
            url: imageUrlInput,
            alt: "User Profile"
          }
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log("Profile updated successfully:", data);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });
    }
  };

  const toggleCreateBooking = () => {
    setShowCreateBooking(!showCreateBooking);
  };

  const handleLogout = () => {
    localStorage.removeItem("avatarUrl");
    localStorage.removeItem('accessToken');
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full rounded-lg overflow-hidden">
        <div className="px-5 py-4 flex flex-col items-center">
          <img
            className="w-24 h-24 rounded-full mb-4 bg-black"
            src={avatarUrl}
            alt="User Profile"
          />
          <h1 className="text-xl font-bold text-white mb-2">Hoisky</h1>
          <p className="text-gray-400">Front-End Developer</p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              About Me
            </h2>
            <p className="text-gray-400 py-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              convallis libero sit amet lorem fringilla, nec luctus leo
              convallis.
            </p>
          </div>
          {isAuthenticated && (
            <>
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2 text-white">
                  Change Avatar (Image Address)
                </h2>
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
                  placeholder="Enter Image Address"
                  value={imageUrlInput}
                  onChange={handleAvatarChange}
                />
                <button
                  onClick={handleImageUrlSubmit}
                  className="bg-blue-500 text-white mt-2 px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
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
              <p>No upcoming bookings.</p>
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
              <p>No venues listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
