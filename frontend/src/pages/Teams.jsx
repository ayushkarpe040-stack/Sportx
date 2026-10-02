import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Teams() {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [tournamentId, setTournamentId] = useState("");
  const [captain, setCaptain] = useState("");
  const [coach, setCoach] = useState("");

  // Fetch Teams
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

  // Fetch Tournaments
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

  useEffect(() => {
    fetchTeams();
    fetchTournaments();
  }, []);

  // Reset Form
  const resetForm = () => {
    setName("");
    setTournamentId("");
    setCaptain("");
    setCoach("");
    setShowForm(false);
  };

  // Create Team
  const createTeam = async () => {
    if (!name || !tournamentId || !captain || !coach) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "https://sportx-lbxd.onrender.com/teams",
        {
          name: name,
          tournament_id: tournamentId,
          captain: captain,
          coach: coach
        }
      );

      alert("Team created successfully!");

      resetForm();
      fetchTeams();

    } catch (error) {
      console.log(error);
      alert("Failed to create team");
    }
  };

  // Get Tournament Name
  const getTournamentName = (id) => {
    const tournament = tournaments.find(
      (tournament) => Number(tournament.id) === Number(id)
    );

    return tournament
      ? tournament.name
      : `Tournament #${id}`;
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
            onClick={() => navigate("/admin-dashboard")}
          >
            <span>▦</span>
            Dashboard
          </button>

          <button
            className="menu-item"
            onClick={() => navigate("/tournaments")}
          >
            <span>🏆</span>
            Tournaments
          </button>

          <button
            className="menu-item active"
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


      {/* ================= MAIN AREA ================= */}

      <main className="main-area">

        {/* TOP BAR */}

        <header className="topbar">

          <div>

            <h1>
              Teams
            </h1>

            <p>
              Manage tournament teams
            </p>

          </div>

          <div className="topbar-right">

            <div className="search-box">

              🔍

              <input
                type="text"
                placeholder="Search teams..."
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
              Team Management
            </h2>

            <p>
              Create and manage registered teams
            </p>

          </div>

          <button
            className="primary-action"
            onClick={() => setShowForm(true)}
          >
            + Create Team
          </button>

        </div>


        {/* CREATE FORM */}

        {showForm && (

          <div className="form-panel">

            <div className="form-header">

              <div>

                <h2>
                  Create New Team
                </h2>

                <p>
                  Enter the team information below
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

              {/* Team Name */}

              <div className="form-field">

                <label>
                  Team Name
                </label>

                <input
                  type="text"
                  placeholder="Enter team name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>


              {/* Tournament Dropdown */}

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
                    Select Tournament
                  </option>

                  {tournaments.map((tournament) => (

                    <option
                      key={tournament.id}
                      value={tournament.id}
                    >
                      {tournament.name}
                    </option>

                  ))}

                </select>

              </div>


              {/* Captain */}

              <div className="form-field">

                <label>
                  Captain
                </label>

                <input
                  type="text"
                  placeholder="Enter captain name"
                  value={captain}
                  onChange={(e) =>
                    setCaptain(e.target.value)
                  }
                />

              </div>


              {/* Coach */}

              <div className="form-field">

                <label>
                  Coach
                </label>

                <input
                  type="text"
                  placeholder="Enter coach name"
                  value={coach}
                  onChange={(e) =>
                    setCoach(e.target.value)
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
                onClick={createTeam}
              >
                Save Team
              </button>

            </div>

          </div>

        )}


        {/* TEAM LIST */}

        <div className="table-panel">

          <div className="table-header">

            <div>

              <h2>
                Team List
              </h2>

              <p>
                {teams.length} registered teams
              </p>

            </div>

          </div>


          {teams.length === 0 ? (

            <div className="empty-state">

              <div>
                👥
              </div>

              <p>
                No teams created yet.
              </p>

            </div>

          ) : (

            <div className="team-table">

              <div className="team-table-row team-table-heading">

                <div>
                  TEAM
                </div>

                <div>
                  TOURNAMENT
                </div>

                <div>
                  CAPTAIN
                </div>

                <div>
                  COACH
                </div>

              </div>


              {teams.map((team) => (

                <div
                  className="team-table-row"
                  key={team.id}
                >

                  <div className="team-name">

                    <div className="team-avatar">
                      👥
                    </div>

                    <div>

                      <strong>
                        {team.name}
                      </strong>

                      <small>
                        Team #{team.id}
                      </small>

                    </div>

                  </div>


                  <div>

                    <span className="tournament-badge">
                      {getTournamentName(team.tournament_id)}
                    </span>

                  </div>


                  <div className="person-name">
                    {team.captain}
                  </div>


                  <div className="person-name">
                    {team.coach}
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

export default Teams;
