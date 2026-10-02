import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {

    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([]);
    const [matches, setMatches] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const userName = localStorage.getItem("userName") || "User";

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        try {

            const tournamentResponse = await axios.get(
                "https://sportx-lbxd.onrender.com/tournaments"
            );

            setTournaments(tournamentResponse.data);

        } catch (error) {

            console.log("Tournament fetch error:", error);

        }

        try {

            const matchResponse = await axios.get(
                "https://sportx-lbxd.onrender.com/matches"
            );

            setMatches(matchResponse.data);

        } catch (error) {

            console.log("Match fetch error:", error);

        }

        try {

            const notificationResponse = await axios.get(
                "https://sportx-lbxd.onrender.com/notifications"
            );

            setNotifications(notificationResponse.data);

        } catch (error) {

            console.log("Notification fetch error:", error);

        }

    };

    const logout = () => {

        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        localStorage.removeItem("userEmail");

        navigate("/");

    };

    return (

        <div className="user-dashboard">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="logo">
                    <h2>SportX</h2>
                    <p>Sports Management</p>
                </div>

                <div className="sidebar-section">

                    <p className="sidebar-title">
                        USER PANEL
                    </p>

                    <button
                        className="menu-item active"
                        onClick={() =>
                            navigate("/user-dashboard")
                        }
                    >
                        <span>🏠</span>
                        Dashboard
                    </button>

                    <button
                        className="menu-item"
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
                            navigate("/user-fixtures")
                        }
                    >
                        <span>📅</span>
                        Fixtures
                    </button>

                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/user-leaderboard")
                        }
                    >
                        <span>🏅</span>
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
                        className="menu-item logout-button"
                        onClick={logout}
                    >
                        <span>🚪</span>
                        Logout
                    </button>

                </div>

            </aside>


            {/* MAIN CONTENT */}

            <main className="main-content">

                {/* HEADER */}

                <div className="top-header">

                    <div>

                        <h1>
                            User Dashboard
                        </h1>

                        <p>
                            Welcome back, {userName}
                        </p>

                    </div>

                    <div className="user-profile">

                        <div className="profile-icon">
                            👤
                        </div>

                        <div>

                            <strong>
                                {userName}
                            </strong>

                            <small>
                                User
                            </small>

                        </div>

                    </div>

                </div>


                {/* STATISTICS */}

                <div className="stats-grid">

                    <div className="stat-card">

                        <div className="stat-icon">
                            🏆
                        </div>

                        <div>

                            <h3>
                                {tournaments.length}
                            </h3>

                            <p>
                                Tournaments
                            </p>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            📅
                        </div>

                        <div>

                            <h3>
                                {matches.length}
                            </h3>

                            <p>
                                Matches
                            </p>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🔴
                        </div>

                        <div>

                            <h3>
                                {
                                    matches.filter(
                                        match =>
                                            match.status === "Live"
                                    ).length
                                }
                            </h3>

                            <p>
                                Live Matches
                            </p>

                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon">
                            🔔
                        </div>

                        <div>

                            <h3>
                                {
                                    notifications.filter(
                                        notification =>
                                            !notification.is_read
                                    ).length
                                }
                            </h3>

                            <p>
                                Notifications
                            </p>

                        </div>

                    </div>

                </div>


                {/* TOURNAMENTS */}

                <section className="dashboard-section">

    <div className="section-header">

        <div>
            <h2>Available Tournaments</h2>

            <p>
                Explore upcoming and ongoing SportX tournaments
            </p>
        </div>

        <button
            className="view-all-button"
            onClick={() => navigate("/user-tournaments")}
        >
            View All →
        </button>

    </div>


    <div className="tournament-grid">

        {tournaments.length === 0 ? (

            <div className="empty-state">

                <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    🏆
                </div>

                <h3>No tournaments available</h3>

                <p>
                    New tournaments will appear here.
                </p>

            </div>

        ) : (

            tournaments
                .slice(0, 6)
                .map((tournament) => (

                    <div
                        className="tournament-card"
                        key={tournament.id}
                    >

                        {/* TOP */}

                        <div className="tournament-card-top">

                            <div className="tournament-icon">
                                🏆
                            </div>

                            <span className="sport-badge">
                                {tournament.sport}
                            </span>

                        </div>


                        {/* TITLE */}

                        <h3 className="tournament-title">
                            {tournament.name}
                        </h3>


                        {/* DETAILS */}

                        <div className="tournament-info">

                            <div className="tournament-detail">

                                <span className="detail-icon">
                                    📅
                                </span>

                                <div>

                                    <small>
                                        Start Date
                                    </small>

                                    <p>
                                        {new Date(
                                            tournament.start_date
                                        ).toLocaleDateString(
                                            "en-IN",
                                            {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            }
                                        )}
                                    </p>

                                </div>

                            </div>


                            <div className="tournament-detail">

                                <span className="detail-icon">
                                    📍
                                </span>

                                <div>

                                    <small>
                                        Venue
                                    </small>

                                    <p>
                                        {tournament.venue ||
                                            "Venue not specified"}
                                    </p>

                                </div>

                            </div>


                            <div className="tournament-detail">

                                <span className="detail-icon">
                                    👥
                                </span>

                                <div>

                                    <small>
                                        Maximum Teams
                                    </small>

                                    <p>
                                        {tournament.max_teams || 0} Teams
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* BUTTON */}

                        <button
                            className="card-button"
                            onClick={() =>
                                navigate("/user-tournaments")
                            }
                        >
                            View Tournament
                            <span>→</span>
                        </button>

                    </div>

                ))

        )}

    </div>

</section>


                {/* UPCOMING / RECENT MATCHES */}

                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Matches
                            </h2>

                            <p>
                                Upcoming and live matches
                            </p>

                        </div>

                        <button
                            className="view-all-button"
                            onClick={() =>
                                navigate("/user-fixtures")
                            }
                        >
                            View Fixtures
                        </button>

                    </div>


                    <div className="match-list">

                        {
                            matches.length === 0 ? (

                                <div className="empty-state">

                                    <p>
                                        No matches available.
                                    </p>

                                </div>

                            ) : (

                                matches
                                    .slice(0, 5)
                                    .map((match) => (

                                        <div
                                            className="match-card"
                                            key={match.id}
                                        >

                                            <div className="match-date">

                                                <strong>
                                                    {new Date(
                                                        match.match_date
                                                    ).toLocaleDateString()}
                                                </strong>

                                                <span>
                                                    {match.match_time}
                                                </span>

                                            </div>


                                            <div className="match-teams">

                                                <strong>
                                                    {match.team1_name ||
                                                        "Team 1"}
                                                </strong>

                                                <span>
                                                    VS
                                                </span>

                                                <strong>
                                                    {match.team2_name ||
                                                        "Team 2"}
                                                </strong>

                                            </div>


                                            <div className="match-status">

                                                <span
                                                    className={
                                                        match.status === "Live"
                                                            ? "status-live"
                                                            : "status-scheduled"
                                                    }
                                                >
                                                    {match.status}
                                                </span>

                                            </div>


                                            <div className="match-venue">

                                                📍{" "}
                                                {match.venue_name ||
                                                    match.venue ||
                                                    "Venue not specified"}

                                            </div>

                                        </div>

                                    ))

                            )
                        }

                    </div>

                </section>


                {/* NOTIFICATIONS */}

                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Recent Notifications
                            </h2>

                            <p>
                                Latest SportX updates
                            </p>

                        </div>

                        <button
                            className="view-all-button"
                            onClick={() =>
                                navigate("/notifications")
                            }
                        >
                            View All
                        </button>

                    </div>


                    <div className="notification-list">

                        {
                            notifications.length === 0 ? (

                                <div className="empty-state">

                                    <p>
                                        No notifications available.
                                    </p>

                                </div>

                            ) : (

                                notifications
                                    .slice(0, 5)
                                    .map((notification) => (

                                        <div
                                            className="notification-card"
                                            key={notification.id}
                                        >

                                            <div className="notification-icon">
                                                🔔
                                            </div>

                                            <div className="notification-content">

                                                <h3>
                                                    {notification.title}
                                                </h3>

                                                <p>
                                                    {notification.message}
                                                </p>

                                                <small>
                                                    {
                                                        new Date(
                                                            notification.created_at
                                                        ).toLocaleString()
                                                    }
                                                </small>

                                            </div>

                                        </div>

                                    ))

                            )
                        }

                    </div>

                </section>

            </main>

        </div>

    );

}

export default UserDashboard;
