import { useParams, useHistory } from "react-router-dom";

const DeleteVenue = () => {
    const { id } = useParams();
    console.log(id);
    const history = useHistory();
    const accessToken = localStorage.getItem("accessToken");
    
    const handleDelete = async (url, id) => {
        try {
            const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            console.log(data);
            history.push("/");
        } catch (error) {
            console.error("Error deleting venue:", error);
        }
    };
    
    return (
        <div>
        <h2>Are you sure you want to delete this venue?</h2>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={() => history.push("/")}>No</button>
        </div>
    );
    };

export default DeleteVenue;
