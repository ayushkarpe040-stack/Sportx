import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserFixtures() {

    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMatches = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:5000/matches"
            );

            setMatches(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchMatches();

    }, []);

    return (

        <div className="app-layout">

            {/* USER SIDEBAR */}

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
                        className="menu-item active"
                        onClick={() => navigate("/user-fixtures")}
                    >
                        <span>📅</span>
                        Fixtures
                    </button>


                    <button
                        className="menu-item"
                        onClick={() => navigate("/leaderboard")}
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


            {/* MAIN CONTENT */}

            <main className="main-content">

                <div className="page-container">

                    <div className="page-header">

                        <div>

                            <h1>Fixtures</h1>

                            <p>
                                View upcoming and scheduled SportX matches
                            </p>

                        </div>

                        <div className="sport-badge">

                            {matches.length} Matches

                        </div>

                    </div>


                    <div className="table-panel">

                        <div className="table-header">

                            <div>

                                <h2>Match Fixtures</h2>

                                <p>
                                    Stay updated with upcoming matches
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="empty-state">

                                Loading fixtures...

                            </div>

                        ) : matches.length === 0 ? (

                            <div className="empty-state">

                                No fixtures available.

                            </div>

                        ) : (

                            <div className="user-list">

                                {matches.map((match) => (

                                    <div
                                        className="user-list-item"
                                        key={match.id}
                                    >

                                        <div>

                                            <h3>

                                                {match.team1_name ||
                                                    "Team 1"}

                                                {" vs "}

                                                {match.team2_name ||
                                                    "Team 2"}

                                            </h3>

                                            <p>

                                                📅 {match.match_date}
                                                {"  •  "}
                                                ⏰ {match.match_time}

                                            </p>

                                            <p>

                                                📍 {match.venue ||
                                                    "Venue not specified"}

                                            </p>

                                        </div>


                                        <div>

                                            <span className="sport-badge">

                                                {match.status ||
                                                    "Scheduled"}

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

export default UserFixtures;