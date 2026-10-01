import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Notifications() {

    const navigate = useNavigate();

    const userRole = localStorage.getItem("userRole");
const isAdmin = userRole === "admin";
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:5000/notifications"
            );

            setNotifications(response.data);

        } catch (error) {

            console.log(error);

            alert("Failed to load notifications");

        } finally {

            setLoading(false);

        }

    };

    const markAsRead = async (id) => {

        try {

            await axios.put(
                `http://127.0.0.1:5000/notifications/${id}/read`
            );

            fetchNotifications();

        } catch (error) {

            console.log(error);

            alert("Failed to mark notification as read");

        }

    };

    useEffect(() => {

        fetchNotifications();

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

                       <span>{isAdmin ? "ADMIN PANEL" : "USER PANEL"}</span>
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
                        onClick={() => navigate("/fixtures")}
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
                        className="menu-item active"
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

                            <h1>Notifications</h1>

                            <p>
                                View important SportX updates and announcements
                            </p>

                        </div>


                        <div className="sport-badge">

                            {notifications.length} Notifications

                        </div>

                    </div>


                    <div className="table-panel">

                        <div className="table-header">

                            <div>

                                <h2>Recent Notifications</h2>

                                <p>
                                    Stay updated with tournament activities
                                </p>

                            </div>

                        </div>


                        {loading ? (

                            <div className="empty-state">

                                Loading notifications...

                            </div>

                        ) : notifications.length === 0 ? (

                            <div className="empty-state">

                                No notifications available.

                            </div>

                        ) : (

                            <div className="notification-list">

                                {notifications.map((notification) => (

                                    <div
                                        className={`notification-card ${
                                            notification.is_read
                                                ? "notification-read"
                                                : "notification-unread"
                                        }`}
                                        key={notification.id}
                                    >

                                        <div className="notification-icon">

                                            🔔

                                        </div>


                                        <div className="notification-content">

                                            <div className="notification-top">

                                                <h3>
                                                    {notification.title}
                                                </h3>

                                                <span className="notification-type">

                                                    {notification.type}

                                                </span>

                                            </div>


                                            <p>

                                                {notification.message}

                                            </p>


                                            <div className="notification-bottom">

                                                <span>

                                                    {new Date(
                                                        notification.created_at
                                                    ).toLocaleString()}

                                                </span>


                                                {notification.is_read ? (

                                                    <span className="read-status">

                                                        ✓ Read

                                                    </span>

                                                ) : (

                                                    <button
                                                        className="mark-read-btn"
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id
                                                            )
                                                        }
                                                    >

                                                        Mark as Read

                                                    </button>

                                                )}

                                            </div>

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

export default Notifications;