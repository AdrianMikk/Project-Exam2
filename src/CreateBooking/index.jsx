import { useState } from "react";

const CreateBooking = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    city: "",
    country: "",
    address: "",
    maxGuests: "",
    wifi: false,
    parking: false,
    breakfast: false,
    petsAllowed: false,
    imageURL: "",
    description: ""
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      ...bookingDetails,
      venue: document.getElementById("venueName").value,
      date: selectedDate
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/holidaze/venues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBooking)
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("Booking created successfully!", data);
      setBookingSuccess(true);
      // Reset form after successful booking creation
      document.getElementById("bookingForm").reset();
      setSelectedDate("");
      setBookingDetails({
        name: "",
        email: "",
        city: "",
        country: "",
        address: "",
        maxGuests: "",
        wifi: false,
        parking: false,
        breakfast: false,
        petsAllowed: false,
        imageURL: "",
        description: ""
      });
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };    

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Booking</h1>
      {/* Venue Selection */}
      <div className="mb-6">
        <label htmlFor="venueName" className="block mb-2 text-sm font-semibold">Name of Venue:</label>
        <input
          type="text"
          id="venueName"
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="venuePrice" className="block mb-2 text-sm font-semibold">Price:</label>
        <input
          type="text"
          id="venuePrice"
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      {/* Date Selection */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-md py-2 px-3 w-full"
        />
      </div>
      {/* Booking Details */}
      <form id="bookingForm" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-sm font-semibold">City:</label>
          <input
            type="text"
            id="city"
            value={bookingDetails.city}
            onChange={(e) => setBookingDetails({ ...bookingDetails, city: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block mb-2 text-sm font-semibold">Country:</label>
          <input
            type="text"
            id="country"
            value={bookingDetails.country}
            onChange={(e) => setBookingDetails({ ...bookingDetails, country: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-semibold">Address:</label>
          <input
            type="text"
            id="address"
            value={bookingDetails.address}
            onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="maxGuests" className="block mb-2 text-sm font-semibold">Max Guests:</label>
          <input
            type="number"
            id="maxGuests"
            value={bookingDetails.maxGuests}
            onChange={(e) => setBookingDetails({ ...bookingDetails, maxGuests: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="imageURL" className="block mb-2 text-sm font-semibold">Image URL:</label>
          <input
            type="text"
            id="imageURL"
            value={bookingDetails.imageURL}
            onChange={(e) => setBookingDetails({ ...bookingDetails, imageURL: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-semibold">Description:</label>
          <textarea
            id="description"
            value={bookingDetails.description}
            onChange={(e) => setBookingDetails({ ...bookingDetails, description: e.target.value })}
            className="border border-gray-300 rounded-md py-2 px-3 w-full h-32"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Amenities:</label>
          <div className="flex flex-wrap items-center">
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.wifi}
                onChange={(e) => setBookingDetails({ ...bookingDetails, wifi: e.target.checked })}
                className="mr-2"
              />
              Wifi
            </label>
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.parking}
                onChange={(e) => setBookingDetails({ ...bookingDetails, parking: e.target.checked })}
                className="mr-2"
              />
              Parking
            </label>
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.breakfast}
                onChange={(e) => setBookingDetails({ ...bookingDetails, breakfast: e.target.checked })}
                className="mr-2"
              />
              Breakfast
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={bookingDetails.petsAllowed}
                onChange={(e) => setBookingDetails({ ...bookingDetails, petsAllowed: e.target.checked })}
                className="mr-2"
              />
              Pets Allowed
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create Booking</button>
      </form>
      {bookingSuccess && (
        <p className="text-green-600 font-semibold mt-4">Booking created successfully!</p>
      )}
    </div>
  );
};

export default CreateBooking;
