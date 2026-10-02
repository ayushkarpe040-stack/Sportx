import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Fixtures() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);

const [venues, setVenues] = useState([]);
const [referees, setReferees] = useState([]);

const [venueId, setVenueId] = useState("");
const [refereeId, setRefereeId] = useState("");

  const [tournamentId, setTournamentId] = useState("");
  const [team1Id, setTeam1Id] = useState("");
  const [team2Id, setTeam2Id] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [venue, setVenue] = useState("");

  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/matches"
      );

      setMatches(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchVenues = async () => {
  try {
    const response = await axios.get(
      "https://sportx-lbxd.onrender.com/venues"
    );

    setVenues(response.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchReferees = async () => {
  try {
    const response = await axios.get(
      "https://sportx-lbxd.onrender.com/referees"
    );

    setReferees(response.data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/tournaments"
      );

      setTournaments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTeams = async () => {
    try {
      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/teams"
      );

      setTeams(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchMatches();
  fetchTournaments();
  fetchTeams();
  fetchVenues();
  fetchReferees();
}, []);
const resetForm = () => {
  setTournamentId("");
  setTeam1Id("");
  setTeam2Id("");
  setMatchDate("");
  setMatchTime("");
  setVenue("");
  setVenueId("");
  setRefereeId("");
  setShowForm(false);
};

  const createMatch = async () => {
    if (
  !tournamentId ||
  !team1Id ||
  !team2Id ||
  !matchDate ||
  !matchTime ||
  !venueId ||
  !refereeId
) {
      alert("Please fill all fields");
      return;
    }

    if (team1Id === team2Id) {
      alert("Team 1 and Team 2 cannot be the same!");
      return;
    }

    try {
     await axios.post(
  "https://sportx-lbxd.onrender.com/matches",
  {
    tournament_id: tournamentId,
    team1_id: team1Id,
    team2_id: team2Id,
    match_date: matchDate,
    match_time: matchTime,
    venue: venue,
    venue_id: venueId,
    referee_id: refereeId
  }
);

      alert("Match created successfully!");

      resetForm();
      fetchMatches();

    } catch (error) {
      console.log(error);
      alert("Failed to create match");
    }
  };

  const getTeamName = (id) => {
    return (
      teams.find(
        (team) => team.id === Number(id)
      )?.name || "Unknown Team"
    );
  };

  const getTournamentName = (id) => {
    return (
      tournaments.find(
        (tournament) =>
          tournament.id === Number(id)
      )?.name || "Unknown Tournament"
    );
  };

  const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
timeZone: "Asia/Kolkata"
  });
};

  return (
    <div className="sportx-dashboard">

      {/* ================= SIDEBAR ================= */}

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
            onClick={() =>
             navigate("/user-dashboard")
            }
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="menu-item"
            onClick={() =>
              navigate("/tournaments")
            }
          >
            <span>🏆</span>
            Tournaments
          </button>

          <button
            className="menu-item"
            onClick={() =>
              navigate("/teams")
            }
          >
            <span>👥</span>
            Teams
          </button>

          <button
            className="menu-item"
            onClick={() =>
              navigate("/players")
            }
          >
            <span>⚽</span>
            Players
          </button>

          <button
            className="menu-item active"
            onClick={() =>
              navigate("/fixtures")
            }
          >
            <span>📅</span>
            Fixtures
          </button>
<button 
  className="menu-item"
  onClick={() => 
    navigate("/live-scoring") 
  }
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


      {/* ================= MAIN AREA ================= */}

      <main className="main-area">

        {/* TOP BAR */}

        <header className="topbar">

          <div>

            <h1>
              Fixtures
            </h1>

            <p>
              Schedule and manage tournament matches
            </p>

          </div>

          <div className="topbar-right">

            <div className="search-box">

              🔍

              <input
                type="text"
                placeholder="Search matches..."
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

                <strong>
                  Admin
                </strong>

                <small>
                  Administrator
                </small>

              </div>

            </div>

          </div>

        </header>


        {/* PAGE HEADER */}

        <div className="page-header">

          <div>

            <h2>
              Fixture Management
            </h2>

            <p>
              Create and manage scheduled matches
            </p>

          </div>

          <button
            className="primary-action"
            onClick={() => setShowForm(true)}
          >
            + Create Match
          </button>

        </div>


        {/* CREATE MATCH FORM */}

        {showForm && (

          <div className="form-panel">

            <div className="form-header">

              <div>

                <h2>
                  Create New Match
                </h2>

                <p>
                  Schedule a match between two teams
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

              {/* Tournament */}

              <div className="form-field">

                <label>
                  Tournament
                </label>

                <select
                  value={tournamentId}
                  onChange={(e) =>
                    setTournamentId(e.target.value)
                  }
                >

                  <option value="">
                    Select tournament
                  </option>

                  {tournaments.map(
                    (tournament) => (

                      <option
                        key={tournament.id}
                        value={tournament.id}
                      >
                        {tournament.name}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* Team 1 */}

              <div className="form-field">

                <label>
                  Team 1
                </label>

                <select
                  value={team1Id}
                  onChange={(e) =>
                    setTeam1Id(e.target.value)
                  }
                >

                  <option value="">
                    Select first team
                  </option>

                  {teams.map((team) => (

                    <option
                      key={team.id}
                      value={team.id}
                    >
                      {team.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* Team 2 */}

              <div className="form-field">

                <label>
                  Team 2
                </label>

                <select
                  value={team2Id}
                  onChange={(e) =>
                    setTeam2Id(e.target.value)
                  }
                >

                  <option value="">
                    Select second team
                  </option>

                  {teams.map((team) => (

                    <option
                      key={team.id}
                      value={team.id}
                    >
                      {team.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* Date */}

              <div className="form-field">

                <label>
                  Match Date
                </label>

                <input
                  type="date"
                  value={matchDate}
                  onChange={(e) =>
                    setMatchDate(e.target.value)
                  }
                />

              </div>


              {/* Time */}

              <div className="form-field">

                <label>
                  Match Time
                </label>

                <input
                  type="time"
                  value={matchTime}
                  onChange={(e) =>
                    setMatchTime(e.target.value)
                  }
                />

              </div>


              {/* Venue */}

<div className="form-field">

  <label>
    Venue
  </label>

  <select
    value={venueId}
    onChange={(e) => {
      setVenueId(e.target.value);

      const selectedVenue = venues.find(
        (v) => v.id === Number(e.target.value)
      );

      setVenue(selectedVenue?.name || "");
    }}
  >

    <option value="">
      Select venue
    </option>

    {venues.map((venueItem) => (

      <option
        key={venueItem.id}
        value={venueItem.id}
      >
        {venueItem.name}
      </option>

    ))}

  </select>

</div>


{/* Referee */}

<div className="form-field">

  <label>
    Referee
  </label>

  <select
    value={refereeId}
    onChange={(e) =>
      setRefereeId(e.target.value)
    }
  >

    <option value="">
      Select referee
    </option>

    {referees.map((referee) => (

      <option
        key={referee.id}
        value={referee.id}
      >
        {referee.name}
      </option>

    ))}

  </select>

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
                onClick={createMatch}
              >
                Save Match
              </button>

            </div>

          </div>

        )}


        {/* MATCH LIST */}

        <div className="table-panel">

          <div className="table-header">

            <div>

              <h2>
                Scheduled Matches
              </h2>

              <p>
                {matches.length} matches scheduled
              </p>

            </div>

          </div>


          {matches.length === 0 ? (

            <div className="empty-state">

              <div>
                📅
              </div>

              <p>
                No matches scheduled yet.
              </p>

            </div>

          ) : (

            <div className="fixture-table">

              <div className="fixture-row fixture-heading">

                <div>
                  MATCH
                </div>

                <div>
                  TOURNAMENT
                </div>

                <div>
                  DATE
                </div>

                <div>
                  TIME
                </div>

                <div>
  VENUE
</div>

<div>
  REFEREE
</div>

<div>
  STATUS
</div>
              </div>


              {matches.map((match) => (

                <div
                  className="fixture-row"
                  key={match.id}
                >

                  <div className="match-teams">

                    <strong>
                      {getTeamName(
                        match.team1_id
                      )}
                    </strong>

                    <span>
                      VS
                    </span>

                    <strong>
                      {getTeamName(
                        match.team2_id
                      )}
                    </strong>

                  </div>


                  <div>

                    <span className="tournament-badge">
                      {getTournamentName(
                        match.tournament_id
                      )}
                    </span>

                  </div>

<div>
  {formatDate(match.match_date)}
</div>

                  <div className="match-time">
                    {match.match_time}
                  </div>


                 <div>
  {match.venue_name || match.venue || "Not assigned"}
</div>

<div>
  {match.referee_name || "Not assigned"}
</div>
                  <div>

                    <span className="status-badge">
                      {match.status || "Scheduled"}
                    </span>

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

export default Fixtures;
