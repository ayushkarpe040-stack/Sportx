import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Tournaments() {
  const navigate = useNavigate();

  const [tournaments, setTournaments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [sport, setSport] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venue, setVenue] = useState("");
  const [maxTeams, setMaxTeams] = useState("");

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/tournaments"
      );

      setTournaments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  const resetForm = () => {
    setName("");
    setSport("");
    setStartDate("");
    setEndDate("");
    setVenue("");
    setMaxTeams("");
    setShowForm(false);
  };

  const createTournament = async () => {
    if (
      !name ||
      !sport ||
      !startDate ||
      !endDate ||
      !venue ||
      !maxTeams
    ) {
      alert("Please fill all fields");
      return;
    }

    if (endDate < startDate) {
      alert("End date cannot be before start date");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:5000/tournaments",
        {
          name: name,
          sport: sport,
          start_date: startDate,
          end_date: endDate,
          venue: venue,
          max_teams: maxTeams
        }
      );

      alert("Tournament created successfully!");

      resetForm();
      fetchTournaments();
    } catch (error) {
      console.log(error);
      alert("Failed to create tournament");
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return String(date).split("T")[0];
  };

  return (
    <div className="sportx-dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-logo">

          <div className="logo-icon">
            ⚡
          </div>

          <div>
            <h2>SportX</h2>
            <span>SPORTS MANAGEMENT</span>
          </div>

        </div>

        <div className="menu-title">
          MAIN MENU
        </div>

        <nav>

          <button
            className="menu-item"
            onClick={() => navigate("/admin-dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="menu-item active"
            onClick={() => navigate("/tournaments")}
          >
            <span>🏆</span>
            Tournaments
          </button>

          <button
            className="menu-item"
            onClick={() => navigate("/teams")}
          >
            <span>👥</span>
            Teams
          </button>

          <button
            className="menu-item"
            onClick={() => navigate("/players")}
          >
            <span>⚽</span>
            Players
          </button>

          <button
            className="menu-item"
            onClick={() => navigate("/fixtures")}
          >
            <span>📅</span>
            Fixtures
          </button>
<button
  className="menu-item"
  onClick={() => navigate("/live-scoring")}
>
  <span>🔴</span>
  Live Scoring
</button>
<button 
  className="menu-item" 
  onClick={() => navigate("/leaderboard")} 
> 
  <span>🏆</span> 
  Leaderboard 
</button>

<button
    className="menu-item"
    onClick={() => navigate("/venues")}
>
    <span>🏟️</span>
    Venues
</button>
<button
    className="menu-item"
    onClick={() => navigate("/referees")}
>
    <span>🧑‍⚖️</span>
    Referees
</button>
        </nav>

        <div className="sidebar-bottom">

          <button className="menu-item">
            <span>⚙️</span>
            Settings
          </button>

          <button
            className="logout-button"
            onClick={() => navigate("/")}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN AREA */}

      <main className="main-area">

        {/* TOP BAR */}

        <header className="topbar">

          <div>
            <h1>Tournaments</h1>

            <p>
              Create and manage sports tournaments
            </p>
          </div>

          <div className="topbar-right">

            <div className="search-box">

              🔍

              <input
                type="text"
                placeholder="Search tournaments..."
              />

            </div>

            <button className="notification">
              🔔
              <span></span>
            </button>

            <div className="admin-profile">

              <div className="profile-avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <small>Administrator</small>
              </div>

            </div>

          </div>

        </header>


        {/* PAGE HEADER */}

        <div className="page-header">

          <div>

            <h2>
              Tournament Management
            </h2>

            <p>
              Create and manage your sports tournaments
            </p>

          </div>

          <button
            className="primary-action"
            onClick={() => setShowForm(true)}
          >
            + Create Tournament
          </button>

        </div>


        {/* FORM */}

        {showForm && (

          <div className="form-panel">

            <div className="form-header">

              <div>

                <h2>
                  Create New Tournament
                </h2>

                <p>
                  Enter tournament information below
                </p>

              </div>

              <button
                className="close-button"
                onClick={resetForm}
              >
                ×
              </button>

            </div>


            <div className="form-grid">

              <div className="form-field">

                <label>
                  Tournament Name
                </label>

                <input
                  type="text"
                  placeholder="Enter tournament name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Sport
                </label>

                <input
                  type="text"
                  placeholder="e.g. Football"
                  value={sport}
                  onChange={(e) =>
                    setSport(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Start Date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    setStartDate(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  End Date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    setEndDate(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Venue
                </label>

                <input
                  type="text"
                  placeholder="Enter tournament venue"
                  value={venue}
                  onChange={(e) =>
                    setVenue(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Maximum Teams
                </label>

                <input
                  type="number"
                  min="2"
                  placeholder="e.g. 16"
                  value={maxTeams}
                  onChange={(e) =>
                    setMaxTeams(e.target.value)
                  }
                />

              </div>

            </div>


            <div className="form-actions">

              <button
                className="secondary-action"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                className="primary-action"
                onClick={createTournament}
              >
                Save Tournament
              </button>

            </div>

          </div>

        )}


        {/* TOURNAMENT LIST */}

        <div className="table-panel">

          <div className="table-header">

            <h2>
              Tournament List
            </h2>

            <p>
              {tournaments.length} tournaments created
            </p>

          </div>


          {tournaments.length === 0 ? (

            <div className="empty-state">

              <div>🏆</div>

              <p>
                No tournaments created yet.
              </p>

            </div>

          ) : (

            <div className="tournament-table">

              <div className="tournament-row tournament-heading">

                <div>TOURNAMENT</div>
                <div>SPORT</div>
                <div>START DATE</div>
                <div>END DATE</div>
                <div>VENUE</div>
                <div>MAX TEAMS</div>

              </div>


              {tournaments.map((tournament) => (

               <div
  className="tournament-row"
  key={tournament.id}
  onClick={() => navigate(`/tournament-details/${tournament.id}`)}
  style={{ cursor: "pointer" }}
>

                  <div className="tournament-name">

                    <div className="tournament-icon-box">
                      🏆
                    </div>

                    <div>

                      <strong>
                        {tournament.name}
                      </strong>

                      <small>
                        Tournament #{tournament.id}
                      </small>

                    </div>

                  </div>


                  <div>

                    <span className="sport-badge">
                      {tournament.sport}
                    </span>

                  </div>


                  <div>
                    {formatDate(
                      tournament.start_date
                    )}
                  </div>


                  <div>
                    {formatDate(
                      tournament.end_date
                    )}
                  </div>


                  <div className="venue-name">
                    {tournament.venue}
                  </div>


                  <div className="team-limit">
                    {tournament.max_teams}
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}

export default Tournaments;