const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
    res.send("SportX Backend is Running!");
});


// =====================================================
// LOGIN
// =====================================================

app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {

        if (err) {
            console.log("Login database error:", err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: user
        });

    });

});


// =====================================================
// TOURNAMENTS
// =====================================================

// Create Tournament

app.post("/tournaments", (req, res) => {

    const {
        name,
        sport,
        start_date,
        end_date,
        venue,
        max_teams
    } = req.body;

    const sql = `
        INSERT INTO tournaments
        (name, sport, start_date, end_date, venue, max_teams)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            sport,
            start_date,
            end_date,
            venue,
            max_teams
        ],
        (err, result) => {

            if (err) {
                console.log("Tournament creation error:", err);

                return res.status(500).json({
                    message: "Failed to create tournament"
                });
            }

            res.json({
                message: "Tournament created successfully",
                tournamentId: result.insertId
            });

        }
    );

});


// Get Tournaments

app.get("/tournaments", (req, res) => {

    const sql =
        "SELECT * FROM tournaments ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.log("Tournament fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch tournaments"
            });
        }

        res.json(results);

    });

});


// Get Tournament Details

app.get("/tournaments/:id", (req, res) => {

    const tournamentId = req.params.id;

    const sql = `
        SELECT
            tournaments.*,
            COUNT(DISTINCT teams.id) AS total_teams,
            COUNT(DISTINCT matches.id) AS total_matches

        FROM tournaments

        LEFT JOIN teams
            ON tournaments.id = teams.tournament_id

        LEFT JOIN matches
            ON tournaments.id = matches.tournament_id

        WHERE tournaments.id = ?

        GROUP BY tournaments.id
    `;

    db.query(sql, [tournamentId], (err, results) => {

        if (err) {
            console.log("Tournament details error:", err);

            return res.status(500).json({
                message: "Failed to fetch tournament details"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Tournament not found"
            });
        }

        res.json(results[0]);

    });

});


// Get Teams for a Tournament

app.get("/tournaments/:id/teams", (req, res) => {

    const tournamentId = req.params.id;

    const sql = `
        SELECT
            teams.id,
            teams.name,
            teams.captain,
            teams.coach

        FROM teams

        WHERE teams.tournament_id = ?

        ORDER BY teams.id ASC
    `;

    db.query(sql, [tournamentId], (err, results) => {

        if (err) {
            console.log("Tournament teams error:", err);

            return res.status(500).json({
                message: "Failed to fetch tournament teams"
            });
        }

        res.json(results);

    });

});


// =====================================================
// TEAMS
// =====================================================

// Create Team

app.post("/teams", (req, res) => {

    const {
        name,
        tournament_id,
        captain,
        coach
    } = req.body;

    const sql = `
        INSERT INTO teams
        (name, tournament_id, captain, coach)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            tournament_id,
            captain,
            coach
        ],
        (err, result) => {

            if (err) {
                console.log("Team creation error:", err);

                return res.status(500).json({
                    message: "Failed to create team"
                });
            }

            res.json({
                message: "Team created successfully",
                teamId: result.insertId
            });

        }
    );

});


// Get Teams

app.get("/teams", (req, res) => {

    const sql =
        "SELECT * FROM teams ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.log("Team fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch teams"
            });
        }

        res.json(results);

    });

});


// =====================================================
// PLAYERS
// =====================================================

// Create Player

app.post("/players", (req, res) => {

    const {
        name,
        team_id,
        age,
        position,
        jersey_number
    } = req.body;

    const sql = `
        INSERT INTO players
        (name, team_id, age, position, jersey_number)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            team_id,
            age,
            position,
            jersey_number
        ],
        (err, result) => {

            if (err) {
                console.log("Player creation error:", err);

                return res.status(500).json({
                    message: "Failed to create player"
                });
            }

            res.json({
                message: "Player created successfully",
                playerId: result.insertId
            });

        }
    );

});


// Get Players

app.get("/players", (req, res) => {

    const sql =
        "SELECT * FROM players ORDER BY id DESC";

    db.query(sql, (err, results) => {

        if (err) {
            console.log("Player fetch error:", err);

            return res.status(500).json({
                message: "Failed to fetch players"
            });
        }

        res.json(results);

    });

});


// Delete Player

app.delete("/players/:id", (req, res) => {

    const { id } = req.params;

    const sql =
        "DELETE FROM players WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.log("Player delete error:", err);

            return res.status(500).json({
                message: "Failed to delete player"
            });
        }

        res.json({
            message: "Player deleted successfully"
        });

    });

});


// Update Player

app.put("/players/:id", (req, res) => {

    const { id } = req.params;

    const {
        name,
        team_id,
        age,
        position,
        jersey_number
    } = req.body;

    const sql = `
        UPDATE players
        SET
            name = ?,
            team_id = ?,
            age = ?,
            position = ?,
            jersey_number = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            name,
            team_id,
            age,
            position,
            jersey_number,
            id
        ],
        (err, result) => {

            if (err) {
                console.log("Player update error:", err);

                return res.status(500).json({
                    message: "Failed to update player"
                });
            }

            res.json({
                message: "Player updated successfully"
            });

        }
    );

});


// =====================================================
// DASHBOARD COUNTS
// =====================================================

app.get("/dashboard-counts", (req, res) => {

    const queries = {

        tournaments:
            "SELECT COUNT(*) AS count FROM tournaments",

        teams:
            "SELECT COUNT(*) AS count FROM teams",

        players:
            "SELECT COUNT(*) AS count FROM players",

        matches:
            "SELECT COUNT(*) AS count FROM matches"

    };

    db.query(
        queries.tournaments,
        (err, tournamentResult) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to get tournament count"
                });
            }

            db.query(
                queries.teams,
                (err, teamResult) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Failed to get team count"
                        });
                    }

                    db.query(
                        queries.players,
                        (err, playerResult) => {

                            if (err) {
                                return res.status(500).json({
                                    message: "Failed to get player count"
                                });
                            }

                            db.query(
                                queries.matches,
                                (err, matchResult) => {

                                    if (err) {
                                        return res.status(500).json({
                                            message: "Failed to get match count"
                                        });
                                    }

                                    res.json({

                                        tournaments:
                                            tournamentResult[0].count,

                                        teams:
                                            teamResult[0].count,

                                        players:
                                            playerResult[0].count,

                                        matches:
                                            matchResult[0].count

                                    });

                                }
                            );

                        }
                    );

                }
            );

        }
    );

});


// =====================================================
// MATCHES
// =====================================================

// Create Match

app.post("/matches", (req, res) => {

    const {
        tournament_id,
        team1_id,
        team2_id,
        match_date,
        match_time,
        venue,
        venue_id,
        referee_id
    } = req.body;

    const sql = `
        INSERT INTO matches
        (
            tournament_id,
            team1_id,
            team2_id,
            match_date,
            match_time,
            venue,
            venue_id,
            referee_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            tournament_id,
            team1_id,
            team2_id,
            match_date,
            match_time,
            venue,
            venue_id,
            referee_id
        ],
        (err, result) => {

            if (err) {
                console.log("Match creation error:", err);

                return res.status(500).json({
                    message: "Failed to create match"
                });
            }

            res.json({
                message: "Match created successfully",
                matchId: result.insertId
            });

        }
    );

});


// Update Live Score

app.put("/matches/:id", (req, res) => {

    const { id } = req.params;

    const {
        team1_score,
        team2_score,
        status
    } = req.body;

    console.log(
        "Updating Match:",
        id,
        team1_score,
        team2_score,
        status
    );

    const sql = `
        UPDATE matches
        SET
            team1_score = ?,
            team2_score = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            team1_score,
            team2_score,
            status,
            id
        ],
        (err, result) => {

            if (err) {

                console.log(
                    "UPDATE MATCH ERROR:",
                    err
                );

                return res.status(500).json({
                    message: err.message
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Match not found"
                });

            }

            console.log(
                "Match updated successfully!"
            );

            res.json({
                message: "Match score updated successfully"
            });

        }
    );

});


// Get Matches
// IMPORTANT: This returns the actual team names.

app.get("/matches", (req, res) => {

    const sql = `
        SELECT
            matches.*,

            team1.name AS team1_name,
            team2.name AS team2_name,

            venues.name AS venue_name,
            referees.name AS referee_name

        FROM matches

        LEFT JOIN teams AS team1
            ON matches.team1_id = team1.id

        LEFT JOIN teams AS team2
            ON matches.team2_id = team2.id

        LEFT JOIN venues
            ON matches.venue_id = venues.id

        LEFT JOIN referees
            ON matches.referee_id = referees.id

        ORDER BY matches.id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "Match fetch error:",
                err
            );

            return res.status(500).json({
                message: "Failed to fetch matches"
            });

        }

        res.json(results);

    });

});


// =====================================================
// PLAYER STATISTICS
// =====================================================

app.put("/player-stats/:playerId", (req, res) => {

    const { playerId } = req.params;

    const {
        matches_played,
        goals,
        assists,
        points
    } = req.body;

    const sql = `
        UPDATE player_stats
        SET
            matches_played = ?,
            goals = ?,
            assists = ?,
            points = ?
        WHERE player_id = ?
    `;

    db.query(
        sql,
        [
            matches_played,
            goals,
            assists,
            points,
            playerId
        ],
        (err, result) => {

            if (err) {

                console.log(
                    "Player stats update error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to update player statistics"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message:
                        "Player statistics not found"
                });

            }

            res.json({
                message:
                    "Player statistics updated successfully"
            });

        }
    );

});


// =====================================================
// PLAYER LEADERBOARD
// =====================================================

app.get("/player-leaderboard", (req, res) => {

    const sql = `
        SELECT
            players.id,
            players.name,
            players.position,
            players.jersey_number,

            teams.name AS team_name,

            player_stats.matches_played,
            player_stats.goals,
            player_stats.assists,
            player_stats.points

        FROM player_stats

        JOIN players
            ON player_stats.player_id = players.id

        JOIN teams
            ON players.team_id = teams.id

        ORDER BY
            player_stats.points DESC,
            player_stats.goals DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "Leaderboard error:",
                err
            );

            return res.status(500).json({
                message:
                    "Failed to load leaderboard"
            });

        }

        res.json(results);

    });

});


// =====================================================
// VENUE MANAGEMENT
// =====================================================

// Create Venue

app.post("/venues", (req, res) => {

    const {
        name,
        location,
        capacity
    } = req.body;

    const sql = `
        INSERT INTO venues
        (name, location, capacity)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            location,
            capacity
        ],
        (err, result) => {

            if (err) {

                console.log(
                    "Venue creation error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to create venue"
                });

            }

            res.json({
                message:
                    "Venue created successfully",

                venueId:
                    result.insertId
            });

        }
    );

});


// Get Venues

app.get("/venues", (req, res) => {

    const sql = `
        SELECT *
        FROM venues
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "Venue fetch error:",
                err
            );

            return res.status(500).json({
                message:
                    "Failed to load venues"
            });

        }

        res.json(results);

    });

});


// =====================================================
// REFEREE MANAGEMENT
// =====================================================

// Create Referee

app.post("/referees", (req, res) => {

    const {
        name,
        phone,
        email,
        experience
    } = req.body;

    const sql = `
        INSERT INTO referees
        (name, phone, email, experience)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            name,
            phone,
            email,
            experience
        ],
        (err, result) => {

            if (err) {

                console.log(
                    "Referee creation error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to create referee"
                });

            }

            res.json({
                message:
                    "Referee created successfully",

                refereeId:
                    result.insertId
            });

        }
    );

});


// Get Referees

app.get("/referees", (req, res) => {

    const sql = `
        SELECT *
        FROM referees
        ORDER BY id DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "Referee fetch error:",
                err
            );

            return res.status(500).json({
                message:
                    "Failed to load referees"
            });

        }

        res.json(results);

    });

});


// =====================================================
// NOTIFICATIONS
// =====================================================

// Get Notifications

app.get("/notifications", (req, res) => {

    const sql = `
        SELECT *
        FROM notifications
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {

        if (err) {

            console.log(
                "Notification fetch error:",
                err
            );

            return res.status(500).json({
                message:
                    "Failed to fetch notifications"
            });

        }

        res.json(results);

    });

});


// Create Notification

app.post("/notifications", (req, res) => {

    const {
        title,
        message,
        type
    } = req.body;

    if (!title || !message) {

        return res.status(400).json({
            message:
                "Title and message are required"
        });

    }

    const sql = `
        INSERT INTO notifications
        (title, message, type)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            message,
            type || "info"
        ],
        (err, result) => {

            if (err) {

                console.log(
                    "Notification creation error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to create notification"
                });

            }

            res.json({

                message:
                    "Notification created successfully",

                notificationId:
                    result.insertId

            });

        }
    );

});


// Mark Notification as Read

app.put("/notifications/:id/read", (req, res) => {

    const notificationId =
        req.params.id;

    const sql = `
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = ?
    `;

    db.query(
        sql,
        [notificationId],
        (err, result) => {

            if (err) {

                console.log(
                    "Notification update error:",
                    err
                );

                return res.status(500).json({
                    message:
                        "Failed to update notification"
                });

            }

            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message:
                        "Notification not found"
                });

            }

            res.json({
                message:
                    "Notification marked as read"
            });

        }
    );

});


// =====================================================
// START SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `SportX server running on http://localhost:${PORT}`
    );

});