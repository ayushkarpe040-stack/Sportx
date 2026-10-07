import { useEffect, useState } from "react";
import axios from "axios";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [showForm, setShowForm] = useState(false);

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
        setShowForm(false);
        loadVenues();
      })
      .catch((error) => {
        console.log("Add venue error:", error);
      });
  };

  return (
    <div className="venues-page">
      <div className="venues-header">
        <div>
          <h1>Venue Management</h1>
          <p>Manage sports venues and facilities</p>
        </div>

        <button
          className="add-venue-btn"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Venue
        </button>
      </div>

      {showForm && (
        <div className="venue-form-card">
          <h2>Add New Venue</h2>

          <form onSubmit={addVenue}>
            <div className="venue-form-grid">
              <div className="venue-input-group">
                <label>Venue Name</label>
                <input
                  type="text"
                  placeholder="Enter venue name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="venue-input-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="venue-input-group">
                <label>Capacity</label>
                <input
                  type="number"
                  placeholder="Enter capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="venue-form-actions">
              <button
                type="button"
                className="cancel-venue-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-venue-btn">
                Save Venue
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="venue-stats-card">
        <div className="venue-stat-icon">🏟️</div>

        <div>
          <span>Total Venues</span>
          <strong>{venues.length}</strong>
        </div>
      </div>

      <div className="venues-card">
        <div className="venues-card-header">
          <div>
            <h2>Sports Venues</h2>
            <p>Available tournament venues</p>
          </div>

          <span className="venue-count">
            {venues.length} {venues.length === 1 ? "Venue" : "Venues"}
          </span>
        </div>

        {venues.length === 0 ? (
          <div className="venues-empty">
            <div className="empty-icon">🏟️</div>
            <h3>No Venues Available</h3>
            <p>Add a venue to start managing your sports facilities.</p>
          </div>
        ) : (
          <div className="venues-table-wrapper">
            <table className="venues-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Venue Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                </tr>
              </thead>

              <tbody>
                {venues.map((venue, index) => (
                  <tr key={venue.id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="venue-name-cell">
                        <div className="venue-mini-icon">🏟️</div>
                        <strong>{venue.name}</strong>
                      </div>
                    </td>

                    <td>
                      <span className="location-cell">
                        📍 {venue.location}
                      </span>
                    </td>

                    <td>
                      <span className="capacity-badge">
                        {venue.capacity} seats
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Venues;