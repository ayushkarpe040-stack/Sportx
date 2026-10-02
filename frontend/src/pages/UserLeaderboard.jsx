import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserLeaderboard() {

    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaderboard = async () => {

        try {

const response = await axios.get(
    "https://sportx-lbxd.onrender.com/player-leaderboard"
);

            setPlayers(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchLeaderboard();

    }, []);

    return (

        <div className="app-layout">

            <aside className="sidebar">

                <div className="sidebar-logo">

                    <div className="sidebar-logo-icon">
                        🏆
                    </div>

                    <div>
                        <h2>SportX</h2>
                        <span>USER PANEL</span>
                    </div>

                </div>


                <div className="sidebar-menu">

                    <button
                        className="menu-item"
                        onClick={() => navigate("/user-dashboard")}
                    >
                        <span>🏠</span>
                        Dashboard
                    </button>


                    <button
                        className="menu-item"
                        onClick={() => navigate("/user-tournaments")}
                    >
                        <span>🏆</span>
                        Tournaments
                    </button>


                    <button
                        className="menu-item"
                        onClick={() => navigate("/user-fixtures")}
                    >
                        <span>📅</span>
                        Fixtures
                    </button>


                    <button
                        className="menu-item active"
                        onClick={() => navigate("/user-leaderboard")}
                    >
                        <span>📊</span>
                        Leaderboard
                    </button>


                    <button
                        className="menu-item"
                        onClick={() => navigate("/notifications")}
                    >
                        <span>🔔</span>
                        Notifications
                    </button>

                </div>


                <div className="sidebar-bottom">

                    <button
                        className="menu-item"
                        onClick={() => navigate("/")}
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>


            <main className="main-content">

                <div className="page-container">

                    <div className="page-header">

                        <div>

                            <h1>Leaderboard</h1>

                            <p>
                                View player rankings and performance
                            </p>

                        </div>

                        <div className="sport-badge">

                            {players.length} Players

                        </div>

                    </div>


                    <div className="table-panel">

                        <div className="table-header">

                            <div>

                                <h2>Player Rankings</h2>

                                <p>
                                    Top performing players in SportX
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="empty-state">

                                Loading leaderboard...

                            </div>

                        ) : players.length === 0 ? (

                            <div className="empty-state">

                                No player statistics available.

                            </div>

                        ) : (

                            <div className="user-list">

                                {players.map((player, index) => (

                                    <div
                                        className="user-list-item"
                                        key={player.player_id || player.id}
                                    >

                                        <div>

                                            <h3>

                                                #{index + 1}{" "}
                                                {player.player_name ||
                                                    player.name ||
                                                    "Player"}

                                            </h3>

                                            <p>

                                                ⚽ Goals:{" "}
                                                {player.goals || 0}
                                                {"  •  "}
                                                🎯 Assists:{" "}
                                                {player.assists || 0}

                                            </p>

                                        </div>


                                        <div>

                                            <span className="sport-badge">

                                                {player.points || 0} Points

                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

}

export default UserLeaderboard;
