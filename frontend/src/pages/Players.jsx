import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Players() {
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [editPlayerId, setEditPlayerId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [age, setAge] = useState("");
  const [position, setPosition] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");

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

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/players"
      );

      setPlayers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);

  const resetForm = () => {
    setEditPlayerId(null);
    setName("");
    setTeamId("");
    setAge("");
    setPosition("");
    setJerseyNumber("");
    setShowForm(false);
  };

  const createPlayer = async () => {
    if (!name || !teamId || !age || !position || !jerseyNumber) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editPlayerId) {
        await axios.put(
          `https://sportx-lbxd.onrender.com/players/${editPlayerId}`,
          {
            name,
            team_id: teamId,
            age,
            position,
            jersey_number: jerseyNumber
          }
        );

        alert("Player updated successfully!");
      } else {
        await axios.post(
          "https://sportx-lbxd.onrender.com/players",
          {
            name,
            team_id: teamId,
            age,
            position,
            jersey_number: jerseyNumber
          }
        );

        alert("Player created successfully!");
      }

      resetForm();
      fetchPlayers();

    } catch (error) {
      console.log(error);
      alert("Failed to save player");
    }
  };

  const editPlayer = (player) => {
    setEditPlayerId(player.id);
    setName(player.name);
    setTeamId(player.team_id);
    setAge(player.age);
    setPosition(player.position);
    setJerseyNumber(player.jersey_number);
    setShowForm(true);
  };

  const deletePlayer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this player?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `https://sportx-lbxd.onrender.com/players/${id}`
      );

      alert("Player deleted successfully!");

      fetchPlayers();

    } catch (error) {
      console.log(error);
      alert("Failed to delete player");
    }
  };

  const getTeamName = (id) => {
    return (
      teams.find(
        (team) => team.id === Number(id)
      )?.name || "Unknown Team"
    );
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
            onClick={() =>
              navigate("/admin-dashboard")
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
            className="menu-item active"
            onClick={() =>
              navigate("/players")
            }
          >
            <span>⚽</span>
            Players
          </button>

          <button
            className="menu-item"
            onClick={() =>
              navigate("/fixtures")
            }
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

            <h1>
              Players
            </h1>

            <p>
              Manage registered tournament players
            </p>

          </div>

          <div className="topbar-right">

            <div className="search-box">

              🔍

              <input
                type="text"
                placeholder="Search players..."
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
              Player Management
            </h2>

            <p>
              Add, edit and manage players
            </p>

          </div>

          <button
            className="primary-action"
            onClick={() => {
              setEditPlayerId(null);
              setName("");
              setTeamId("");
              setAge("");
              setPosition("");
              setJerseyNumber("");
              setShowForm(true);
            }}
          >
            + Add Player
          </button>

        </div>


        {/* FORM */}

        {showForm && (

          <div className="form-panel">

            <div className="form-header">

              <div>

                <h2>
                  {editPlayerId
                    ? "Edit Player"
                    : "Add New Player"}
                </h2>

                <p>
                  Enter player information below
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
                  Player Name
                </label>

                <input
                  type="text"
                  placeholder="Enter player name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Team
                </label>

                <select
                  value={teamId}
                  onChange={(e) =>
                    setTeamId(e.target.value)
                  }
                >

                  <option value="">
                    Select team
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


              <div className="form-field">

                <label>
                  Age
                </label>

                <input
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Position
                </label>

                <input
                  type="text"
                  placeholder="e.g. Forward"
                  value={position}
                  onChange={(e) =>
                    setPosition(e.target.value)
                  }
                />

              </div>


              <div className="form-field">

                <label>
                  Jersey Number
                </label>

                <input
                  type="number"
                  placeholder="e.g. 10"
                  value={jerseyNumber}
                  onChange={(e) =>
                    setJerseyNumber(e.target.value)
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
                onClick={createPlayer}
              >
                {editPlayerId
                  ? "Update Player"
                  : "Save Player"}
              </button>

            </div>

          </div>

        )}


        {/* PLAYER LIST */}

        <div className="table-panel">

          <div className="table-header">

            <div>

              <h2>
                Player List
              </h2>

              <p>
                {players.length} registered players
              </p>

            </div>

          </div>


          {players.length === 0 ? (

            <div className="empty-state">

              <div>
                ⚽
              </div>

              <p>
                No players added yet
              </p>

            </div>

          ) : (

            <div className="player-table">

              <div className="table-row table-heading">

                <div>
                  PLAYER
                </div>

                <div>
                  TEAM
                </div>

                <div>
                  AGE
                </div>

                <div>
                  POSITION
                </div>

                <div>
                  JERSEY
                </div>

                <div>
                  ACTIONS
                </div>

              </div>


              {players.map((player) => (

                <div
                  className="table-row"
                  key={player.id}
                >

                  <div className="player-name">

                    <div className="player-avatar">
                      {player.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <strong>
                      {player.name}
                    </strong>

                  </div>


                  <div>
                    {getTeamName(
                      player.team_id
                    )}
                  </div>


                  <div>
                    {player.age}
                  </div>


                  <div>

                    <span className="position-badge">
                      {player.position}
                    </span>

                  </div>


                  <div className="jersey-number">
                    #{player.jersey_number}
                  </div>


                  <div className="action-buttons">

                    <button
                      className="edit-action"
                      onClick={() =>
                        editPlayer(player)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-action"
                      onClick={() =>
                        deletePlayer(player.id)
                      }
                    >
                      Delete
                    </button>

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

export default Players;
