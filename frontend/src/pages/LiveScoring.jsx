import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LiveScoring() {

  const navigate = useNavigate();

  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [status, setStatus] = useState("Scheduled");
  const [updating, setUpdating] = useState(false);


  // ===============================
  // LOAD DATA
  // ===============================

  useEffect(() => {
    fetchMatches();
    fetchTeams();
    fetchTournaments();
  }, []);


  const fetchMatches = async () => {
    try {

      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/matches"
      );

      setMatches(response.data);

    } catch (error) {

      console.log("Matches error:", error);

    }
  };


  const fetchTeams = async () => {
    try {

      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/teams"
      );

      setTeams(response.data);

    } catch (error) {

      console.log("Teams error:", error);

    }
  };


  const fetchTournaments = async () => {
    try {

      const response = await axios.get(
        "https://sportx-lbxd.onrender.com/tournaments"
      );

      setTournaments(response.data);

    } catch (error) {

      console.log("Tournaments error:", error);

    }
  };


  // ===============================
  // HELPERS
  // ===============================

  const getTeamName = (id) => {

    const team = teams.find(
      (team) => team.id === Number(id)
    );

    return team?.name || `Team #${id}`;

  };


  const getTournamentName = (id) => {

    const tournament = tournaments.find(
      (tournament) => tournament.id === Number(id)
    );

    return tournament?.name || "Tournament";

  };


  const formatDate = (date) => {

    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    });

  };


  // ===============================
  // SELECT MATCH
  // ===============================

  const selectMatch = (match) => {

    setSelectedMatch(match);

    setTeam1Score(
      Number(match.team1_score) || 0
    );

    setTeam2Score(
      Number(match.team2_score) || 0
    );

    setStatus(
      match.status || "Scheduled"
    );

  };


  // ===============================
  // SCORE CONTROLS
  // ===============================

  const increaseTeam1 = () => {
    setTeam1Score((score) => score + 1);
  };


  const decreaseTeam1 = () => {
    setTeam1Score(
      (score) => Math.max(0, score - 1)
    );
  };


  const increaseTeam2 = () => {
    setTeam2Score((score) => score + 1);
  };


  const decreaseTeam2 = () => {
    setTeam2Score(
      (score) => Math.max(0, score - 1)
    );
  };


  // ===============================
  // UPDATE LIVE SCORE
  // ===============================

  const updateScore = async () => {

    if (!selectedMatch) {

      alert("Please select a match first.");

      return;

    }

    setUpdating(true);

    const scoreData = {

      team1_score: team1Score,

      team2_score: team2Score,

      status: status

    };


    console.log(
      "Sending score update:",
      selectedMatch.id,
      scoreData
    );


    try {

      const response = await axios.put(
        `https://sportx-lbxd.onrender.com/matches/${selectedMatch.id}`,
        scoreData
      );


      console.log(
        "Backend response:",
        response.data
      );


      const updatedMatch = {

        ...selectedMatch,

        team1_score: team1Score,

        team2_score: team2Score,

        status: status

      };


      setSelectedMatch(updatedMatch);


      setMatches((previousMatches) =>

        previousMatches.map((match) =>

          match.id === selectedMatch.id

            ? updatedMatch

            : match

        )

      );


      alert(
        "Live score updated successfully!"
      );


    } catch (error) {

      console.log(
        "Score update error:",
        error
      );


      if (error.response) {

        console.log(
          "Backend status:",
          error.response.status
        );


        console.log(
          "Backend message:",
          error.response.data
        );


        alert(
          `Score update failed: ${
            error.response.data?.message ||
            "Backend error"
          }`
        );


      } else if (error.request) {

        alert(
          "Backend server is not responding. Make sure server.js is running."
        );


      } else {

        alert(
          `Request error: ${error.message}`
        );

      }

    } finally {

      setUpdating(false);

    }

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
            className="menu-item"
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
            className="menu-item active"
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


        </nav>


        {/* ================= BOTTOM MENU ================= */}

        <div className="sidebar-bottom">


          <button
            className="menu-item"
          >

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


        {/* TOPBAR */}

        <header className="topbar">

          <div>

            <h1>
              Live Scoring
            </h1>

            <p>
              Real-time tournament match control
            </p>

          </div>


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

        </header>


        {/* PAGE HEADER */}

        <div className="page-header live-page-header">

          <div>

            <h2>
              Live Match Control
            </h2>

            <p>
              Select a match and manage its live score
            </p>

          </div>


          {selectedMatch &&
            status === "Live" && (

              <div className="live-indicator">

                <span className="live-dot"></span>

                LIVE NOW

              </div>

            )}


        </div>


        {/* MATCH SELECTOR */}

        <div className="form-panel match-selector-panel">


          <div className="form-header">

            <div>

              <h2>
                Select Match
              </h2>

              <p>
                Choose a tournament fixture to control
              </p>

            </div>


            <div className="match-count">

              {matches.length} Matches

            </div>


          </div>


          <div className="form-field">

            <label>
              MATCH
            </label>


            <select

              value={
                selectedMatch?.id || ""
              }

              onChange={(e) => {

                const match =
                  matches.find(
                    (m) =>
                      m.id ===
                      Number(e.target.value)
                  );


                if (match) {

                  selectMatch(match);

                } else {

                  setSelectedMatch(null);

                }

              }}

            >


              <option value="">
                Select a match
              </option>


              {matches.map((match) => (

                <option
                  key={match.id}
                  value={match.id}
                >

                  Match #{match.id} —{" "}

                  {getTeamName(
                    match.team1_id
                  )}

                  {" VS "}

                  {getTeamName(
                    match.team2_id
                  )}

                </option>

              ))}


            </select>

          </div>


        </div>


        {/* ================= SCOREBOARD ================= */}

        {selectedMatch ? (

          <div className="live-score-container">


            {/* MATCH INFO */}

            <div className="live-match-info">


              <div className="live-match-tournament">

                <span>
                  🏆
                </span>

                <div>

                  <small>
                    TOURNAMENT
                  </small>

                  <strong>

                    {getTournamentName(
                      selectedMatch.tournament_id
                    )}

                  </strong>

                </div>

              </div>


              <div className="live-match-details">


                <div>

                  <small>
                    MATCH
                  </small>

                  <strong>
                    #{selectedMatch.id}
                  </strong>

                </div>


                <div>

                  <small>
                    DATE
                  </small>

                  <strong>

                    {formatDate(
                      selectedMatch.match_date
                    )}

                  </strong>

                </div>


                <div>

                  <small>
                    TIME
                  </small>

                  <strong>
                    {selectedMatch.match_time}
                  </strong>

                </div>


                <div>

                  <small>
                    VENUE
                  </small>

                  <strong>

                    {selectedMatch.venue ||
                      "Not specified"}

                  </strong>

                </div>


              </div>


            </div>


            {/* PROFESSIONAL SCOREBOARD */}

            <div className="professional-scoreboard">


              {/* STATUS BAR */}

              <div className="scoreboard-top">


                {status === "Live" ? (

                  <div className="live-status">

                    <span className="live-dot"></span>

                    LIVE

                  </div>

                ) : (

                  <div className="scheduled-status">

                    {status}

                  </div>

                )}


                <span className="scoreboard-label">
                  MATCH SCORE
                </span>


              </div>


              {/* TEAMS */}

              <div className="teams-score-area">


                {/* TEAM 1 */}

                <div className="live-team">


                  <div className="team-icon">
                    ⚽
                  </div>


                  <h2>

                    {getTeamName(
                      selectedMatch.team1_id
                    )}

                  </h2>


                  <span className="team-label">
                    HOME
                  </span>


                  <div className="score-control">


                    <button
                      className="score-minus"
                      onClick={
                        decreaseTeam1
                      }
                    >
                      −
                    </button>


                    <div className="big-score">
                      {team1Score}
                    </div>


                    <button
                      className="score-plus"
                      onClick={
                        increaseTeam1
                      }
                    >
                      +
                    </button>


                  </div>


                </div>


                {/* VS */}

                <div className="score-divider">

                  <div className="divider-line"></div>

                  <div className="vs-circle">
                    VS
                  </div>

                  <div className="divider-line"></div>

                </div>


                {/* TEAM 2 */}

                <div className="live-team">


                  <div className="team-icon">
                    ⚽
                  </div>


                  <h2>

                    {getTeamName(
                      selectedMatch.team2_id
                    )}

                  </h2>


                  <span className="team-label">
                    AWAY
                  </span>


                  <div className="score-control">


                    <button
                      className="score-minus"
                      onClick={
                        decreaseTeam2
                      }
                    >
                      −
                    </button>


                    <div className="big-score">
                      {team2Score}
                    </div>


                    <button
                      className="score-plus"
                      onClick={
                        increaseTeam2
                      }
                    >
                      +
                    </button>


                  </div>


                </div>


              </div>


              {/* BOTTOM CONTROL */}

              <div className="scoreboard-bottom">


                <div className="status-control">

                  <label>
                    MATCH STATUS
                  </label>


                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                  >

                    <option value="Scheduled">
                      Scheduled
                    </option>

                    <option value="Live">
                      Live
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                  </select>


                </div>


                <button
                  className="update-live-button"
                  onClick={updateScore}
                  disabled={updating}
                >

                  <span>
                    {updating ? "⏳" : "✓"}
                  </span>

                  {updating
                    ? "Updating..."
                    : "Update Live Score"}

                </button>


              </div>


            </div>


            {/* HELP */}

            <div className="score-help">


              <div>

                <span>
                  ➕
                </span>

                <strong>
                  Use + / −
                </strong>

                <small>
                  to change the score
                </small>

              </div>


              <div>

                <span>
                  🔴
                </span>

                <strong>
                  Set Live
                </strong>

                <small>
                  when the match begins
                </small>

              </div>


              <div>

                <span>
                  ✓
                </span>

                <strong>
                  Update Score
                </strong>

                <small>
                  to save changes
                </small>

              </div>


            </div>


          </div>


        ) : (


          /* EMPTY STATE */

          <div className="live-empty-state">


            <div className="empty-live-icon">
              🔴
            </div>


            <h2>
              No Match Selected
            </h2>


            <p>
              Select a match above to open
              the live scoring control panel.
            </p>


            <button
              className="primary-action"
              onClick={() =>
                navigate("/fixtures")
              }
            >

              📅 View Fixtures

            </button>


          </div>

        )}


      </main>


    </div>

  );

}

export default LiveScoring;
