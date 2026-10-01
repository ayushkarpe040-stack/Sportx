import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Venues() {

    const navigate = useNavigate();

    const [venues, setVenues] = useState([]);

    const [form, setForm] = useState({
        name: "",
        location: "",
        capacity: ""
    });

    const [loading, setLoading] = useState(false);


    // =====================================================
    // GET VENUES
    // =====================================================

    const getVenues = () => {

        axios
            .get("http://127.0.0.1:5000/venues")
            .then((response) => {

                setVenues(response.data);

            })
            .catch((error) => {

                console.log("Venues error:", error);

            });

    };


    useEffect(() => {

        getVenues();

    }, []);


    // =====================================================
    // FORM INPUT
    // =====================================================

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    // =====================================================
    // ADD VENUE
    // =====================================================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!form.name || !form.location || !form.capacity) {

            alert("Please fill all venue details");

            return;

        }

        setLoading(true);

        axios
            .post(
                "http://127.0.0.1:5000/venues",
                {
                    name: form.name,
                    location: form.location,
                    capacity: Number(form.capacity)
                }
            )
            .then(() => {

                alert("Venue added successfully!");

                setForm({
                    name: "",
                    location: "",
                    capacity: ""
                });

                getVenues();

            })
            .catch((error) => {

                console.log("Add venue error:", error);

                alert("Failed to add venue");

            })
            .finally(() => {

                setLoading(false);

            });

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
                        className="menu-item"
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
                        onClick={() =>
                            navigate("/live-scoring")
                        }
                    >
                        <span>🔴</span>
                        Live Scoring
                    </button>


                    <button
                        className="menu-item"
                        onClick={() =>
                            navigate("/leaderboard")
                        }
                    >
                        <span>🏆</span>
                        Leaderboard
                    </button>


                    <button
                        className="menu-item active"
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


            {/* ================= MAIN AREA ================= */}

            <main className="main-area">


                {/* TOP BAR */}

                <header className="topbar">

                    <div>

                        <h1>
                            Venues
                        </h1>

                        <p>
                            Manage tournament venues
                        </p>

                    </div>

                </header>


                {/* ================= ADD VENUE ================= */}

                <section className="dashboard-panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                🏟️ Add New Venue
                            </h2>

                            <p>
                                Register a venue for SportX tournaments
                            </p>

                        </div>

                    </div>


                    <form
                        className="venue-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>
                                Venue Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="e.g. College Ground"
                                value={form.name}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Dadar, Mumbai"
                                value={form.location}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Capacity
                            </label>

                            <input
                                type="number"
                                name="capacity"
                                placeholder="e.g. 500"
                                value={form.capacity}
                                onChange={handleChange}
                            />

                        </div>


                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "＋ Add Venue"
                            }

                        </button>

                    </form>

                </section>


                {/* ================= VENUE LIST ================= */}

                <section className="dashboard-panel venue-list-panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                📋 Registered Venues
                            </h2>

                            <p>
                                All venues available for tournaments
                            </p>

                        </div>

                        <span className="venue-count">
                            {venues.length} Venues
                        </span>

                    </div>


                    {venues.length === 0 ? (

                        <div className="empty-state">

                            <div>
                                🏟️
                            </div>

                            <p>
                                No venues registered yet
                            </p>

                        </div>

                    ) : (

                        <div className="venue-grid">

                            {venues.map((venue) => (

                                <div
                                    className="venue-card"
                                    key={venue.id}
                                >

                                    <div className="venue-icon">
                                        🏟️
                                    </div>


                                    <div className="venue-info">

                                        <h3>
                                            {venue.name}
                                        </h3>

                                        <p>
                                            📍 {venue.location}
                                        </p>

                                        <span>
                                            👥 Capacity: {venue.capacity}
                                        </span>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>


            </main>

        </div>

    );

}

export default Venues;