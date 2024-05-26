import { useState, useEffect } from "react";

const UpdateVenue = ({ venueDetails: initialVenueDetails }) => {
  const [venuePrice, setVenuePrice] = useState("");
  const [venueDetails, setVenueDetails] = useState({
    name: "",
    description: "",
    media: [{
      url: "",
      alt: ""
    }],
    price: 0,
    maxGuests: 0,
    rating: 0,
    meta: {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false
    },
    location: {
      address: "",
      city: "",
      zip: "",
      country: "",
      continent: ""
    }
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (initialVenueDetails) {
      setVenueDetails(initialVenueDetails);
      setVenuePrice(initialVenueDetails.price.toString());
    }
  }, [initialVenueDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiKey = import.meta.env.VITE_API_KEY;
    const accessToken = localStorage.getItem('accessToken');

    const updatedData = {
      ...venueDetails,
      price: parseInt(venuePrice),
      maxGuests: parseInt(venueDetails.maxGuests),
    };

    try {
      const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueDetails.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-noroff-api-key': apiKey,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log('Venue updated successfully:', data);
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating venue:', error);
      setUpdateSuccess(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVenueDetails({ ...venueDetails, [id]: value });
  };

  const handleMediaChange = (e) => {
    const { id, value } = e.target;
    setVenueDetails({
      ...venueDetails,
      media: [{ ...venueDetails.media[0], [id]: value }]
    });
  };

  const handleLocationChange = (e) => {
    const { id, value } = e.target;
    setVenueDetails({
      ...venueDetails,
      location: { ...venueDetails.location, [id]: value }
    });
  };

  const handleMetaChange = (e) => {
    const { id, checked } = e.target;
    setVenueDetails({
      ...venueDetails,
      meta: { ...venueDetails.meta, [id]: checked }
    });
  };

  async function deleteVenue() {
    const apiKey = import.meta.env.VITE_API_KEY;
    const accessToken = localStorage.getItem("accessToken");
    await fetch(`https://v2.api.noroff.dev/holidaze/venues/${venueDetails.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'x-noroff-api-key': apiKey,
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete venue");
        }
        return;
      })
      .then((data) => {
        console.log("Venue deleted successfully:", data);
        alert("Venue deleted successfully!");
        window.location.href = "/profile";
      })
      .catch((error) => {
        console.error("Error deleting venue:", error);
      });
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Update Venue</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
        <button type="button" onClick={deleteVenue} className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 mr-4">Delete Venue</button>
          <label htmlFor="name" className="block pt-2 mb-2 text-sm font-semibold">Name</label>
          <input
            type="text"
            id="name"
            value={venueDetails.name}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="venuePrice" className="block mb-2 text-sm font-semibold">Price:</label>
          <input
            type="text"
            id="venuePrice"
            value={venuePrice}
            onChange={(e) => setVenuePrice(e.target.value)}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-semibold">Description:</label>
          <textarea
            id="description"
            value={venueDetails.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full h-32"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="maxGuests" className="block mb-2 text-sm font-semibold">Max Guests:</label>
          <input
            type="number"
            id="maxGuests"
            value={venueDetails.maxGuests}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="url" className="block mb-2 text-sm font-semibold">Image URL:</label>
          <input
            type="text"
            id="url"
            value={venueDetails.media.length > 0 ? venueDetails.media[0].url : ""}
            onChange={handleMediaChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="alt" className="block mb-2 text-sm font-semibold">Alt Text:</label>
          <input
            type="text"
            id="alt"
            value={venueDetails.media.length > 0 ? venueDetails.media[0].alt : ""}
            onChange={handleMediaChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block mb-2 text-sm font-semibold">Address:</label>
          <input
            type="text"
            id="address"
            value={venueDetails.location.address}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="city" className="block mb-2 text-sm font-semibold">City:</label>
          <input
            type="text"
            id="city"
            value={venueDetails.location.city}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="zip" className="block mb-2 text-sm font-semibold">Zip:</label>
          <input
            type="text"
            id="zip"
            value={venueDetails.location.zip}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block mb-2 text-sm font-semibold">Country:</label>
          <input
            type="text"
            id="country"
            value={venueDetails.location.country}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="continent" className="block mb-2 text-sm font-semibold">Continent:</label>
          <input
            type="text"
            id="continent"
            value={venueDetails.location.continent}
            onChange={handleLocationChange}
            className="border border-gray-300 rounded-md py-2 px-3 w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold">Amenities:</label>
          <div className="flex flex-wrap items-center">
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                id="wifi"
                checked={venueDetails.meta.wifi}
                onChange={handleMetaChange}
                className="mr-2"
              />
              Wifi
            </label>
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                id="parking"
                checked={venueDetails.meta.parking}
                onChange={handleMetaChange}
                className="mr-2"
              />
              Parking
            </label>
            <label className="mr-4 flex items-center">
              <input
                type="checkbox"
                id="breakfast"
                checked={venueDetails.meta.breakfast}
                onChange={handleMetaChange}
                className="mr-2"
              />
              Breakfast
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                id="pets"
                checked={venueDetails.meta.pets}
                onChange={handleMetaChange}
                className="mr-2"
              />
              Pets Allowed
            </label>
          </div>
        </div>
        <button type="submit" className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600">Update Venue</button>
        {updateSuccess && (
          <p className="text-green-600 font-semibold mt-4">Venue updated successfully!</p>
        )}
      </form>
    </div>
  );
};

export default UpdateVenue;
