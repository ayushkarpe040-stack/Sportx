import { useEffect, useState } from "react";
import axios from "axios";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  const API = "https://sportx-lbxd.onrender.com";

  const loadVenues = () => {
    axios
      .get(`${API}/venues`)
      .then((response) => {
        setVenues(response.data);
      })
      .catch((error) => {
        console.log("Venues error:", error);
      });
  };

  useEffect(() => {
    loadVenues();
  }, []);

  const addVenue = (e) => {
    e.preventDefault();

    axios
      .post(`${API}/venues`, {
        name,
        location,
        capacity: Number(capacity),
      })
      .then(() => {
        setName("");
        setLocation("");
        setCapacity("");
        loadVenues();
      })
      .catch((error) => {
        console.log("Add venue error:", error);
      });
  };

  return (
    <div className="page-container">
      <h1>Venue Management</h1>
      <p>Manage sports venues and facilities.</p>

      <form onSubmit={addVenue} style={{ marginTop: "25px" }}>
        <input
          type="text"
          placeholder="Venue Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />

        <button type="submit">Add Venue</button>
      </form>

      <div style={{ marginTop: "30px" }}>
        <h2>Venues</h2>

        {venues.length === 0 ? (
          <p>No venues available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Location</th>
                <th>Capacity</th>
              </tr>
            </thead>

            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.name}</td>
                  <td>{venue.location}</td>
                  <td>{venue.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Venues;