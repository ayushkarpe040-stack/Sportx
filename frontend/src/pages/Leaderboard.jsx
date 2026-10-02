import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Leaderboard() {

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://sportx-lbxd.onrender.com/player-leaderboard")
            .then((response) => {
                setPlayers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Leaderboard error:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="app-layout">

            {/* ================= SIDEBAR ================= */}
            <aside className="sidebar">

                <div className="sidebar-logo">
                    <h2>⚽ SportX</h2>
                    <p>Sports Management</p>
                </div>

                <div className="sidebar-menu">

                    {/* Dashboard */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/user-dashboard")}
                    >
                        <span>📊</span>
                        Dashboard
                    </button>

                    {/* Tournaments */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/tournaments")}
                    >
                        <span>🏆</span>
                        Tournaments
                    </button>

                    {/* Teams */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/teams")}
                    >
                        <span>👥</span>
                        Teams
                    </button>

                    {/* Players */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/players")}
                    >
                        <span>🧑‍🤝‍🧑</span>
                        Players
                    </button>

                    {/* Fixtures */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/fixtures")}
                    >
                        <span>📅</span>
                        Fixtures
                    </button>

                    {/* Live Scoring */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/live-scoring")}
                    >
                        <span>🔴</span>
                        Live Scoring
                    </button>

                    {/* Leaderboard */}
                    <button
                        className="menu-item active"
                       onClick={() => navigate("/user-leaderboard")}
                    >
                        <span>🏆</span>
                        Leaderboard
                    </button>

                    {/* Venues */}
                    <button
                        className="menu-item"
                        onClick={() => navigate("/venues")}
                    >
                        <span>🏟️</span>
                        Venues
                    </button>

                </div>

                {/* Sidebar Bottom */}
                <div className="sidebar-bottom">

                    <button className="menu-item">
                        <span>⚙️</span>
                        Settings
                    </button>

                    <button
                        className="menu-item logout"
                        onClick={() => navigate("/")}
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* ================= MAIN CONTENT ================= */}
            <main className="main-content">

                <div className="page-container">

                    {/* Header */}
                    <div className="page-header">
                        <div>
                            <h1>🏆 Player Leaderboard</h1>
                            <p>
                                Player performance and tournament statistics
                            </p>
                        </div>
                    </div>


                    {/* Loading */}
                    {loading && (
                        <div className="dashboard-card">
                            <p>Loading leaderboard...</p>
                        </div>
                    )}


                    {/* Empty */}
                    {!loading && players.length === 0 && (
                        <div className="dashboard-card">
                            <p>No player statistics available.</p>
                        </div>
                    )}


                    {/* Leaderboard */}
                    {!loading && players.length > 0 && (
                        <div className="dashboard-card leaderboard-card">

                            <div className="leaderboard-header">
                                <span>Rank</span>
                                <span>Player</span>
                                <span>Team</span>
                                <span>Matches</span>
                                <span>Goals</span>
                                <span>Assists</span>
                                <span>Points</span>
                            </div>


                            {players.map((player, index) => (

                                <div
                                    className={`leaderboard-row rank-${index + 1}`}
                                    key={player.id}
                                >

                                    {/* Rank */}
                                    <div className="player-rank">
                                        {index === 0 && "🥇"}
                                        {index === 1 && "🥈"}
                                        {index === 2 && "🥉"}
                                        {index > 2 && index + 1}
                                    </div>


                                    {/* Player */}
                                    <div className="player-info">

                                        <div className="player-avatar">
                                            {player.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <strong>
                                                {player.name}
                                            </strong>

                                            <small>
                                                #{player.jersey_number || "-"}{" "}
                                                •{" "}
                                                {player.position || "Player"}
                                            </small>
                                        </div>

                                    </div>


                                    {/* Team */}
                                    <div className="player-team">
                                        {player.team_name}
                                    </div>


                                    {/* Matches */}
                                    <div className="stat-value">
                                        {player.matches_played}
                                    </div>


                                    {/* Goals */}
                                    <div className="stat-value">
                                        {player.goals}
                                    </div>


                                    {/* Assists */}
                                    <div className="stat-value">
                                        {player.assists}
                                    </div>


                                    {/* Points */}
                                    <div className="player-points">
                                        {player.points}
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

export default Leaderboard;
