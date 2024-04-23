import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function VenueDetails() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setVenue(data.data);
      })
      .catch((error) => {
        console.error("Error fetching venue:", error);
      });
  }, [id]);

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center">{venue.title}</h2>
      <div className="max-w-xl">
        <img src={venue.media[0].url} alt={venue.title} className="w-full h-auto mb-4" />
        <p className="text-lg mb-4">{venue.description}</p>
        <p className="text-sm mb-2">
          Original Price: £{venue.price} | Discounted Price: £{venue.discountedPrice}
        </p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={i < venue.rating ? "currentColor" : "none"}
              className={`w-4 h-4 ${i < venue.rating ? "text-yellow-500" : "text-gray-300"}`}
              key={i}
            >
              <path
                fillRule="evenodd"
                d="M10 1.638l1.482 4.537h4.796l-3.878 2.821 1.482 4.538-3.879-2.823-3.878 2.823 1.482-4.538-3.878-2.82h4.795z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;
