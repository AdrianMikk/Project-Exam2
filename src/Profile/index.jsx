import { useState, useEffect } from "react";
import CreateBooking from "../CreateBooking/index.jsx";
import axios from "axios"; 

const Profile = () => {
  const [avatarUrl, setAvatarUrl] = useState(() => {
    // Retrieve avatar URL from localStorage if it exists, otherwise use default
    return localStorage.getItem("avatarUrl") || "https://v2.api.noroff.dev/holidaze/profiles/default-avatar.jpg";
  });

  const [imageUrlInput, setImageUrlInput] = useState(""); // State to store the input value
  const [showCreateBooking, setShowCreateBooking] = useState(false); // State to control whether to show the CreateBooking form
  const [bookings, setBookings] = useState([]); // State to store user's bookings

  useEffect(() => {
    // Save avatarUrl to localStorage whenever it changes
    localStorage.setItem("avatarUrl", avatarUrl);
  }, [avatarUrl]);

  // Simulated booking data
  useEffect(() => {
    // This could be an API call to retrieve actual user bookings
    const userBookings = [
      { id: 1, venue: "Venue 1", date: "2024-05-15" },
      { id: 2, venue: "Venue 2", date: "2024-05-18" },
      // Add more bookings as needed
    ];
    setBookings(userBookings);
  }, []);

  const handleAvatarChange = (event) => {
    const newAvatarUrl = event.target.value;
    setImageUrlInput(newAvatarUrl); // Update the input value state
  };

  const handleImageUrlSubmit = () => {
    if (imageUrlInput.trim() !== "") {
      // Update avatarUrl only if input is not empty
      setAvatarUrl(imageUrlInput);
      // Send a PUT request to update the profile with new avatar URL
      axios.put(`https://v2.api.noroff.dev/holidaze/profiles/Hoisky`, {
        avatar: {
          url: imageUrlInput,
          alt: "User Profile"
        }
      })
      .then(response => {
        console.log("Profile updated successfully:", response.data);
      })
      .catch(error => {
        console.error("Error updating profile:", error);
      });
    }
  };

  // Function to toggle showing/hiding the CreateBooking form
  const toggleCreateBooking = () => {
    setShowCreateBooking(!showCreateBooking);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform any necessary cleanup, e.g., removing tokens from localStorage
    localStorage.removeItem("avatarUrl");
    // Redirect to the login page
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
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Change Avatar (Image Address)
            </h2>
            <input
              type="text"
              className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Enter Image URL"
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
          {/* Add Create Booking button */}
          <div className="flex justify-end mb-4">
            <button onClick={toggleCreateBooking} className="bg-blue-500 text-white mt-6 px-4 py-2 rounded-md hover:bg-blue-600">List New Venue</button>
          </div>
          {showCreateBooking && <CreateBooking />} {/* Conditionally render the CreateBooking form based on showCreateBooking state */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2 text-white">
              Upcoming Bookings
            </h2>
            {bookings.length > 0 ? (
              <ul className="text-gray-400">
                {bookings.map(booking => (
                  <li key={booking.id}>
                    <strong>{booking.venue}</strong> - {booking.date}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No upcoming bookings.</p>
            )}
          </div>
          {/* Logout button */}
          <button 
            onClick={handleLogout} 
            className="bg-red text-white mt-6 px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
