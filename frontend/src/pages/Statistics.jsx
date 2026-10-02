import { useEffect, useState } from "react";
import axios from "axios";

function Statistics() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://sportx-lbxd.onrender.com/player-leaderboard")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Statistics error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="statistics-page">

      {/* Page Header */}
      <div className="statistics-header">
        <div>
          <h1>Player Statistics</h1>
          <p>View player performance and tournament statistics</p>
        </div>
      </div>

      {/* Statistics Content */}
      <div className="statistics-card">

        <div className="statistics-card-header">
          <h2>Player Performance</h2>
          <span>{stats.length} Players</span>
        </div>

        {loading ? (
          <div className="statistics-empty">
            Loading statistics...
          </div>
        ) : stats.length === 0 ? (
          <div className="statistics-empty">
            <div className="statistics-icon">📊</div>
            <h3>No Statistics Available</h3>
            <p>Player statistics will appear here once data is available.</p>
          </div>
        ) : (
          <div className="statistics-table-wrapper">
            <table className="statistics-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Player</th>
                  <th>Team</th>
                  <th>Matches</th>
                  <th>Goals</th>
                  <th>Assists</th>
                  <th>Points</th>
                </tr>
              </thead>

              <tbody>
                {stats.map((player, index) => (
                  <tr key={player.id || index}>
                    <td>{index + 1}</td>

                    <td>
                      <strong>{player.name}</strong>
                    </td>

                    <td>
                      {player.team_name || "—"}
                    </td>

                    <td>
                      {player.matches_played || 0}
                    </td>

                    <td>
                      {player.goals || 0}
                    </td>

                    <td>
                      {player.assists || 0}
                    </td>

                    <td>
                      <strong className="points-value">
                        {player.points || 0}
                      </strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Statistics;
