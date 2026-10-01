import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function TournamentDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

 const [tournament, setTournament] = useState(null);
const [teams, setTeams] = useState([]);
const [loading, setLoading] = useState(true);

  const fetchTournamentDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/tournaments/${id}`
      );

      setTournament(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load tournament details");
    } finally {
      setLoading(false);
    }
  };
const fetchTournamentTeams = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/tournaments/${id}/teams`
    );

    setTeams(response.data);
  } catch (error) {
    console.log(error);
    alert("Failed to load tournament teams");
  }
};
  useEffect(() => {
  fetchTournamentDetails();
  fetchTournamentTeams();
}, [id]);
  const formatDate = (date) => {
  if (!date) return "-";

  const datePart = String(date).split("T")[0];

  const [year, month, day] = datePart.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  return `${day} ${months[Number(month) - 1]} ${year}`;
};

  if (loading) {
    return (
      <div className="sportx-dashboard">
        <main className="main-area">
          <div className="empty-state">
            Loading tournament details...
          </div>
        </main>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="sportx-dashboard">
        <main className="main-area">
          <div className="empty-state">
            Tournament not found.
          </div>
        </main>
      </div>
    );
  }

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
            <h1>Tournament Details</h1>

            <p>
              View complete tournament information
            </p>
          </div>

          <div className="topbar-right">

            <button
              className="secondary-action"
              onClick={() => navigate("/tournaments")}
            >
              ← Back to Tournaments
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


        {/* TOURNAMENT HEADER */}

        <div className="page-header">

          <div>

            <h2>
              🏆 {tournament.name}
            </h2>

            <p>
              Tournament #{tournament.id} • {tournament.sport}
            </p>

          </div>

          <span className="sport-badge">
            {tournament.sport}
          </span>

        </div>


        {/* DETAILS CARDS */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              📅
            </div>

            <div>
              <span>START DATE</span>

              <strong>
                {formatDate(tournament.start_date)}
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              🏁
            </div>

            <div>
              <span>END DATE</span>

              <strong>
                {formatDate(tournament.end_date)}
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              👥
            </div>

            <div>
              <span>TEAMS</span>

              <strong>
                {tournament.total_teams} / {tournament.max_teams}
              </strong>
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              📊
            </div>

            <div>
              <span>TOTAL MATCHES</span>

              <strong>
                {tournament.total_matches}
              </strong>
            </div>

          </div>

        </div>


        {/* INFORMATION PANEL */}

        <div className="table-panel">

          <div className="table-header">

            <h2>
              Tournament Information
            </h2>

            <p>
              Complete details of this tournament
            </p>

          </div>


          <div className="form-grid">

            <div className="form-field">

              <label>
                Tournament Name
              </label>

              <div className="detail-value">
                {tournament.name}
              </div>

            </div>


            <div className="form-field">

              <label>
                Sport
              </label>

              <div className="detail-value">
                {tournament.sport}
              </div>

            </div>


            <div className="form-field">

              <label>
                Start Date
              </label>

              <div className="detail-value">
                {formatDate(tournament.start_date)}
              </div>

            </div>


            <div className="form-field">

              <label>
                End Date
              </label>

              <div className="detail-value">
                {formatDate(tournament.end_date)}
              </div>

            </div>


            <div className="form-field">

              <label>
                Venue
              </label>

              <div className="detail-value">
                🏟️ {tournament.venue || "Not assigned"}
              </div>

            </div>


            <div className="form-field">

              <label>
                Maximum Teams
              </label>

              <div className="detail-value">
                {tournament.max_teams}
              </div>

            </div>


            <div className="form-field">

              <label>
                Registered Teams
              </label>

              <div className="detail-value">
                {tournament.total_teams}
              </div>

            </div>


            <div className="form-field">

              <label>
                Matches Scheduled
              </label>

              <div className="detail-value">
                {tournament.total_matches}
              </div>

            </div>

          </div>

        </div>

{/* REGISTERED TEAMS */}

<div className="table-panel">

  <div className="table-header">

    <div>
      <h2>Registered Teams</h2>

      <p>
        Teams participating in this tournament
      </p>
    </div>

    <span className="sport-badge">
      {teams.length} Teams
    </span>

  </div>

  {teams.length === 0 ? (

    <div className="empty-state">
      No teams registered for this tournament yet.
    </div>

  ) : (

    <div className="form-grid">

      {teams.map((team) => (

        <div
          className="stat-card"
          key={team.id}
        >

          <div className="stat-icon">
            👥
          </div>

          <div>

            <span>TEAM</span>

            <strong>
              {team.name}
            </strong>

            <p>
              Captain: {team.captain || "Not assigned"}
            </p>

            <p>
              Coach: {team.coach || "Not assigned"}
            </p>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
        {/* QUICK ACTIONS */}

        <div className="table-panel">

          <div className="table-header">

            <h2>
              Quick Actions
            </h2>

            <p>
              Manage tournament activities
            </p>

          </div>

          <div className="form-actions">

            <button
              className="primary-action"
              onClick={() => navigate("/teams")}
            >
              👥 Manage Teams
            </button>

            <button
              className="primary-action"
              onClick={() => navigate("/fixtures")}
            >
              📅 View Fixtures
            </button>

            <button
              className="primary-action"
              onClick={() => navigate("/leaderboard")}
            >
              🏆 View Leaderboard
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default TournamentDetails;