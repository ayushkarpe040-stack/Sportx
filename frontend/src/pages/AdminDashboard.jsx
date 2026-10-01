import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    tournaments: 0,
    teams: 0,
    players: 0,
    matches: 0
  });

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);


  // ===============================
  // LOAD DASHBOARD DATA
  // ===============================

  useEffect(() => {

    // Get dashboard counts
    axios
      .get("http://127.0.0.1:5000/dashboard-counts")
      .then((response) => {
        setCounts(response.data);
      })
      .catch((error) => {
        console.log(
          "Dashboard count error:",
          error
        );
      });


    // Get matches
    axios
      .get("http://127.0.0.1:5000/matches")
      .then((response) => {
        setMatches(response.data);
      })
      .catch((error) => {
        console.log(
          "Matches error:",
          error
        );
      });


    // Get teams
    axios
      .get("http://127.0.0.1:5000/teams")
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        console.log(
          "Teams error:",
          error
        );
      });


    // Get player statistics
    axios
      .get(
        "http://127.0.0.1:5000/player-leaderboard"
      )
      .then((response) => {
        setPlayerStats(response.data);
      })
      .catch((error) => {
        console.log(
          "Player stats error:",
          error
        );
      });

  }, []);


  // ===============================
  // GET TEAM NAME
  // ===============================

  const getTeamName = (id) => {

    return (
      teams.find(
        (team) =>
          team.id === Number(id)
      )?.name ||
      "Unknown Team"
    );

  };


  // ===============================
  // ANALYTICS CHART DATA
  // ===============================

  const chartData = {

    labels: playerStats.map(
      (player) => player.name
    ),

    datasets: [

      {
        label: "Points",

        data: playerStats.map(
          (player) => player.points
        ),

        backgroundColor: "#111827",

        borderRadius: 8,

        barThickness: 35
      }

    ]

  };


  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {
        display: false
      },

      title: {

        display: true,

        text: "Player Points Performance"

      }

    },

    scales: {

      y: {
        beginAtZero: true
      }

    }

  };


  return (

    <div className="sportx-dashboard">


      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">


        <div className="sidebar-logo">

         <img
    src="/sportx-logo.png"
    alt="SportX Logo"
    className="sidebar-logo-image"
/>

          <div>

            <h2>
              SportX
            </h2>

            <span>
              SPORTS MANAGEMENT
            </span>

          </div>

        </div>


        <div className="menu-title">
          MAIN MENU
        </div>


        <nav>


          {/* DASHBOARD */}

          <button
            className="menu-item active"
            onClick={() =>
              navigate("/admin-dashboard")
            }
          >

            <span>
              ▦
            </span>

            Dashboard

          </button>


          {/* TOURNAMENTS */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/tournaments")
            }
          >

            <span>
              🏆
            </span>

            Tournaments

          </button>


          {/* TEAMS */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/teams")
            }
          >

            <span>
              👥
            </span>

            Teams

          </button>


          {/* PLAYERS */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/players")
            }
          >

            <span>
              ⚽
            </span>

            Players

          </button>


          {/* FIXTURES */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/fixtures")
            }
          >

            <span>
              📅
            </span>

            Fixtures

          </button>


          {/* LIVE SCORING */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/live-scoring")
            }
          >

            <span>
              🔴
            </span>

            Live Scoring

          </button>


          {/* LEADERBOARD */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/leaderboard")
            }
          >

            <span>
              🏆
            </span>

            Leaderboard

          </button>
{/* STATISTICS */}

<button
  className="menu-item"
  onClick={() =>
    navigate("/statistics")
  }
>

  <span>
    📊
  </span>

  Statistics

</button>

          {/* VENUES */}

          <button
            className="menu-item"
            onClick={() =>
              navigate("/venues")
            }
          >

            <span>
              🏟️
            </span>

            Venues

          </button>

{/* REFEREES */}

<button 
  className="menu-item" 
  onClick={() => 
    navigate("/referees") 
  } 
> 

  <span> 
    🧑‍⚖️ 
  </span> 

  Referees 

</button>
<button
    className="menu-item"
    onClick={() => navigate("/notifications")}
>
    <span>🔔</span>
    Notifications
</button>
        </nav>


        {/* ================= SIDEBAR BOTTOM ================= */}

        <div className="sidebar-bottom">


          <button className="menu-item">

            <span>
              ⚙️
            </span>

            Settings

          </button>


          <button
            className="logout-button"
            onClick={() =>
              navigate("/")
            }
          >

            <span>
              ↪
            </span>

            Logout

          </button>


        </div>


      </aside>


      {/* ================= MAIN AREA ================= */}

      <main className="main-area">


        {/* ================= TOP BAR ================= */}

        <header className="topbar">

  <div className="topbar-left">
    <div className="topbar-title">
      <h1>Dashboard</h1>
      <p>Welcome back, Admin 👋</p>
    </div>
  </div>

  <div className="topbar-right">

            <div className="search-box">

              🔍

              <input
                type="text"
                placeholder="Search..."
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


        {/* ================= STATISTICS ================= */}

        <section className="stats-grid">


          <div className="stat-card">

            <div className="stat-icon tournament-icon">
              🏆
            </div>

            <div>

              <p>
                Total Tournaments
              </p>

              <h2>
                {counts.tournaments}
              </h2>

              <span className="positive">
                ↑ Active tournaments
              </span>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon team-icon">
              👥
            </div>

            <div>

              <p>
                Total Teams
              </p>

              <h2>
                {counts.teams}
              </h2>

              <span className="positive">
                ↑ Registered teams
              </span>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon player-icon">
              ⚽
            </div>

            <div>

              <p>
                Total Players
              </p>

              <h2>
                {counts.players}
              </h2>

              <span className="positive">
                ↑ Registered players
              </span>

            </div>

          </div>


          <div className="stat-card">

            <div className="stat-icon match-icon">
              📅
            </div>

            <div>

              <p>
                Total Matches
              </p>

              <h2>
                {counts.matches}
              </h2>

              <span className="positive">
                ↑ Scheduled matches
              </span>

            </div>

          </div>


        </section>


        {/* ================= DASHBOARD GRID ================= */}

        <section className="dashboard-grid">


          {/* UPCOMING MATCHES */}

          <div className="dashboard-panel large-panel">


            <div className="panel-header">

              <div>

                <h2>
                  Upcoming Matches
                </h2>

                <p>
                  Recently scheduled fixtures
                </p>

              </div>


              <button
                onClick={() =>
                  navigate("/fixtures")
                }
              >
                View All →
              </button>


            </div>


            {matches.length === 0 ? (

              <div className="empty-state">

                <div>
                  📅
                </div>

                <p>
                  No matches scheduled yet
                </p>

              </div>

            ) : (

              <div className="match-list">

                {matches
                  .slice(0, 4)
                  .map((match) => (

                    <div
                      className="match-row"
                      key={match.id}
                    >


                      <div className="match-date">

                        <strong>

                          {new Date(
                            match.match_date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short"
                            }
                          )}

                        </strong>


                        <span>
                          {match.match_time}
                        </span>

                      </div>


                      <div className="match-teams">

                        <strong>
                          {getTeamName(
                            match.team1_id
                          )}
                        </strong>


                        <span className="vs-text">
                          VS
                        </span>


                        <strong>
                          {getTeamName(
                            match.team2_id
                          )}
                        </strong>

                      </div>


                      <div className="match-status">

                        {match.status}

                      </div>


                    </div>

                  ))}

              </div>

            )}


          </div>


          {/* QUICK ACTIONS */}

          <div className="dashboard-panel">


            <div className="panel-header">

              <div>

                <h2>
                  Quick Actions
                </h2>

                <p>
                  Manage SportX
                </p>

              </div>

            </div>


            <div className="quick-actions">


              <button
                onClick={() =>
                  navigate("/tournaments")
                }
              >

                <span>
                  🏆
                </span>

                <div>

                  <strong>
                    Create Tournament
                  </strong>

                  <small>
                    Start a new tournament
                  </small>

                </div>

              </button>


              <button
                onClick={() =>
                  navigate("/teams")
                }
              >

                <span>
                  👥
                </span>

                <div>

                  <strong>
                    Add Team
                  </strong>

                  <small>
                    Register a new team
                  </small>

                </div>

              </button>


              <button
                onClick={() =>
                  navigate("/players")
                }
              >

                <span>
                  ⚽
                </span>

                <div>

                  <strong>
                    Add Player
                  </strong>

                  <small>
                    Register a player
                  </small>

                </div>

              </button>


              <button
                onClick={() =>
                  navigate("/fixtures")
                }
              >

                <span>
                  📅
                </span>

                <div>

                  <strong>
                    Create Fixture
                  </strong>

                  <small>
                    Schedule a match
                  </small>

                </div>

              </button>


            </div>


          </div>


        </section>


        {/* ================= ANALYTICS ================= */}

        <section className="dashboard-panel analytics-panel">


          <div className="panel-header">

            <div>

              <h2>
                📊 Player Performance Analytics
              </h2>

              <p>
                Points scored by players
              </p>

            </div>

          </div>


          <div className="analytics-chart">


            {playerStats.length === 0 ? (

              <div className="empty-state">

                <div>
                  📊
                </div>

                <p>
                  No player statistics available
                </p>

              </div>

            ) : (

              <Bar
                data={chartData}
                options={chartOptions}
              />

            )}


          </div>


        </section>


        {/* ================= BOTTOM SECTION ================= */}

        <section className="dashboard-grid bottom-grid">


          {/* OVERVIEW */}

          <div className="dashboard-panel">


            <div className="panel-header">

              <div>

                <h2>
                  SportX Overview
                </h2>

                <p>
                  Current platform statistics
                </p>

              </div>

            </div>


            <div className="overview-list">


              <div>

                <span>
                  Tournaments
                </span>

                <strong>
                  {counts.tournaments}
                </strong>

              </div>


              <div>

                <span>
                  Teams
                </span>

                <strong>
                  {counts.teams}
                </strong>

              </div>


              <div>

                <span>
                  Players
                </span>

                <strong>
                  {counts.players}
                </strong>

              </div>


              <div>

                <span>
                  Matches
                </span>

                <strong>
                  {counts.matches}
                </strong>

              </div>


            </div>


          </div>


          {/* SYSTEM STATUS */}

          <div className="dashboard-panel performance-panel">


            <div className="panel-header">

              <div>

                <h2>
                  System Status
                </h2>

                <p>
                  SportX platform health
                </p>

              </div>

            </div>


            <div className="system-status">


              <div className="status-circle">
                ✓
              </div>


              <div>

                <strong>
                  All Systems Operational
                </strong>

                <p>
                  Database and backend are connected
                </p>

              </div>


            </div>


          </div>


        </section>


      </main>


    </div>

  );

}

export default AdminDashboard;