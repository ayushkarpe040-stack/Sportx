import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserTournaments() {

    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTournaments = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:5000/tournaments"
            );

            setTournaments(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchTournaments();

    }, []);


    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return String(date).split("T")[0];

    };


    return (

        <div className="app-layout">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="sidebar-logo">

                    <div className="sidebar-logo-icon">
                        🏆
                    </div>

                    <div>

                        <h2>SportX</h2>

                        <span>
                            USER PANEL
                        </span>

                    </div>

                </div>


                <div className="sidebar-menu">

                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/user-dashboard")
                        }
                    >
                        <span>🏠</span>
                        Dashboard
                    </button>


                    <button
                        className="menu-item active"
                        onClick={() =>
                            navigate("/user-tournaments")
                        }
                    >
                        <span>🏆</span>
                        Tournaments
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
                        onClick={() =>
                            navigate("/leaderboard")
                        }
                    >
                        <span>📊</span>
                        Leaderboard
                    </button>


                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/notifications")
                        }
                    >
                        <span>🔔</span>
                        Notifications
                    </button>

                </div>


                <div className="sidebar-bottom">

                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}

            <main className="main-content">

                <div className="page-container">


                    {/* HEADER */}

                    <div className="page-header">

                        <div>

                            <h1>
                                Tournaments
                            </h1>

                            <p>
                                Explore available SportX tournaments
                            </p>

                        </div>

                    </div>


                    {/* TOURNAMENTS */}

                    <div className="table-panel">

                        <div className="table-header">

                            <div>

                                <h2>
                                    Available Tournaments
                                </h2>

                                <p>
                                    {tournaments.length} tournaments available
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="empty-state">

                                Loading tournaments...

                            </div>

                        ) : tournaments.length === 0 ? (

                            <div className="empty-state">

                                <div>🏆</div>

                                <p>
                                    No tournaments available.
                                </p>

                            </div>

                        ) : (

                            <div className="user-list">

                                {tournaments.map(
                                    (tournament) => (

                                        <div
                                            className="user-list-item"
                                            key={tournament.id}
                                            onClick={() =>
                                                navigate(
                                                    `/tournament-details/${tournament.id}`
                                                )
                                            }
                                            style={{
                                                cursor: "pointer"
                                            }}
                                        >

                                            <div>

                                                <strong>
                                                    {tournament.name}
                                                </strong>

                                                <p>
                                                    {tournament.sport}
                                                    {" • "}
                                                    {formatDate(
                                                        tournament.start_date
                                                    )}
                                                    {" to "}
                                                    {formatDate(
                                                        tournament.end_date
                                                    )}
                                                </p>

                                                <p>
                                                    📍{" "}
                                                    {tournament.venue ||
                                                        "Venue not specified"}
                                                </p>

                                            </div>


                                            <span className="sport-badge">

                                                View

                                            </span>

                                        </div>

                                    )
                                )}

                            </div>

                        )}

                    </div>

                </div>

            </main>

        </div>

    );

}

export default UserTournaments;