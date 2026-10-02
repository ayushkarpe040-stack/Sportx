import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Referees() {

    const navigate = useNavigate();

    const [referees, setReferees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        experience: ""
    });

    // ===============================
    // LOAD REFEREES
    // ===============================

    const loadReferees = () => {

        axios
            .get("https://sportx-lbxd.onrender.com/referees")
            .then((response) => {
                setReferees(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Referee fetch error:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        loadReferees();
    }, []);

    // ===============================
    // HANDLE INPUT
    // ===============================

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // ===============================
    // ADD REFEREE
    // ===============================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Please enter referee name.");
            return;
        }

        setSaving(true);

        axios
            .post("https://sportx-lbxd.onrender.com/referees", {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                experience: formData.experience || 0
            })
            .then(() => {

                alert("Referee added successfully!");

                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    experience: ""
                });

                loadReferees();
            })
            .catch((error) => {

                console.error("Referee creation error:", error);

                alert("Failed to add referee.");
            })
            .finally(() => {
                setSaving(false);
            });
    };

    return (

        <div className="app-layout">

            {/* ================= SIDEBAR ================= */}

            <aside className="sidebar">

                <div className="sidebar-logo">

                    <h2>⚽ SportX</h2>

                    <p>Sports Management</p>

                </div>

                <div className="sidebar-menu">

                    <button
                        className="menu-item"
                        onClick={() => navigate("/admin-dashboard")}
                    >
                        <span>📊</span>
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
                        className="menu-item"
                        onClick={() => navigate("/teams")}
                    >
                        <span>👥</span>
                        Teams
                    </button>

                    <button
                        className="menu-item"
                        onClick={() => navigate("/players")}
                    >
                        <span>🧑‍🤝‍🧑</span>
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
                        className="menu-item active"
                        onClick={() => navigate("/referees")}
                    >
                        <span>🧑‍⚖️</span>
                        Referees
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

                <div className="referee-page">

                    {/* ================= HEADER ================= */}

                    <div className="referee-header">

                        <h1>🧑‍⚖️ Referee Management</h1>

                        <p>
                            Manage tournament referees and their experience
                        </p>

                    </div>


                    {/* ================= ADD REFEREE ================= */}

                    <div className="referee-form-card">

                        <h2>🧑‍⚖️ Add New Referee</h2>

                        <p>
                            Register a referee for SportX tournaments
                        </p>

                        <form
                            className="referee-form"
                            onSubmit={handleSubmit}
                        >

                            {/* Name */}

                            <div className="referee-field">

                                <label>
                                    Referee Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter referee name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Phone */}

                            <div className="referee-field">

                                <label>
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Email */}

                            <div className="referee-field">

                                <label>
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Experience */}

                            <div className="referee-field">

                                <label>
                                    Experience (Years)
                                </label>

                                <input
                                    type="number"
                                    name="experience"
                                    placeholder="0"
                                    min="0"
                                    value={formData.experience}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* Button */}

                            <button
                                type="submit"
                                className="referee-add-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Adding..."
                                    : "➕ Add Referee"}
                            </button>

                        </form>

                    </div>


                    {/* ================= REFEREE LIST ================= */}

                    <div className="referee-list-card">

                        <div className="referee-list-header">

                            <div>

                                <h2>
                                    📋 Registered Referees
                                </h2>

                                <p>
                                    All referees registered in SportX
                                </p>

                            </div>

                            <span className="referee-count">
                                {referees.length} Referees
                            </span>

                        </div>


                        {/* Loading */}

                        {loading && (

                            <div className="empty-state">

                                <p>
                                    Loading referees...
                                </p>

                            </div>

                        )}


                        {/* Empty */}

                        {!loading && referees.length === 0 && (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    🧑‍⚖️
                                </div>

                                <h3>
                                    No referees yet
                                </h3>

                                <p>
                                    Add your first referee using the form above.
                                </p>

                            </div>

                        )}


                        {/* Referee Grid */}

                        {!loading && referees.length > 0 && (

                            <div className="referee-grid">

                                {referees.map((referee) => (

                                    <div
                                        className="referee-card"
                                        key={referee.id}
                                    >

                                        <div className="referee-icon">
                                            🧑‍⚖️
                                        </div>

                                        <div className="referee-info">

                                            <h3>
                                                {referee.name}
                                            </h3>

                                            <p>
                                                📞{" "}
                                                {referee.phone || "No phone"}
                                            </p>

                                            <p>
                                                ✉️{" "}
                                                {referee.email || "No email"}
                                            </p>

                                            <p>
                                                ⭐{" "}
                                                {referee.experience || 0} years
                                                experience
                                            </p>

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

export default Referees;
