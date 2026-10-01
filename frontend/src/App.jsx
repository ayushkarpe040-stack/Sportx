import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import { useState } from "react";
import axios from "axios";

import AdminDashboard from "./pages/AdminDashboard";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Fixtures from "./pages/Fixtures";
import LiveScoring from "./pages/LiveScoring";
import Leaderboard from "./pages/Leaderboard";
import Statistics from "./pages/Statistics";
import Venues from "./pages/Venues";
import Referees from "./pages/Referees";
import TournamentDetails from "./pages/TournamentDetails";
import Notifications from "./pages/Notifications";

import UserDashboard from "./pages/UserDashboard";
import UserTournaments from "./pages/UserTournaments";
import UserFixtures from "./pages/UserFixtures";
import UserLeaderboard from "./pages/UserLeaderboard";



/* =====================================================
   PROTECTED ROUTE
===================================================== */

function ProtectedRoute({ children, allowedRole }) {

  const role = localStorage.getItem("userRole");

  /* User is not logged in */

  if (!role) {

    window.location.href = "/";

    return null;

  }


  /* User has wrong role */

  if (allowedRole && role !== allowedRole) {

    if (role === "admin") {

      window.location.href = "/admin-dashboard";

    } else {

      window.location.href = "/user-dashboard";

    }

    return null;

  }


  return children;

}



/* =====================================================
   LOGIN PAGE
===================================================== */

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  const navigate = useNavigate();



  /* LOGIN */

  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          email: email,
          password: password
        }
      );


      /* Save role */

      localStorage.setItem(
        "userRole",
        response.data.user.role
      );


      /* Save user information */

      localStorage.setItem(
        "userName",
        response.data.user.name
      );

      localStorage.setItem(
        "userEmail",
        response.data.user.email
      );


      setMessage(response.data.message);


      /* Redirect according to role */

      setTimeout(() => {

        if (response.data.user.role === "admin") {

          navigate("/admin-dashboard");

        } else {

          navigate("/user-dashboard");

        }

      }, 500);


    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    }

  };



  return (

    <div className="login-page">


      {/* BACKGROUND SHAPES */}

      <div className="login-background-shape shape-one"></div>

      <div className="login-background-shape shape-two"></div>



      {/* LOGIN CARD */}

      <div className="login-card">


        {/* BRAND */}

        <div className="login-brand">

          <img
    src="/sportx-logo.png"
    alt="SportX Logo"
    className="login-logo"
/>

          <h1>
            SportX
          </h1>

          <p>
            SPORTS TOURNAMENT MANAGEMENT
          </p>

        </div>



        {/* HEADING */}

        <div className="login-heading">

          <h2>
            Welcome Back!
          </h2>

          <p>
            Sign in to manage your tournaments
          </p>

        </div>



        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>


          {/* EMAIL */}

          <div className="login-input-group">

            <label>
              Email Address
            </label>

            <div className="login-input-wrapper">

              <span>
                ✉
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>

          </div>



          {/* PASSWORD */}

          <div className="login-input-group">

            <label>
              Password
            </label>

            <div className="login-input-wrapper">

              <span>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />


              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {showPassword
                  ? "🙈"
                  : "👁"}

              </button>

            </div>

          </div>



          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-submit"
          >

            Login

            <span>
              →
            </span>

          </button>


        </form>



        {/* LOGIN MESSAGE */}

        {message && (

          <div className="login-message">

            {message}

          </div>

        )}



        {/* FOOTER */}

        <div className="login-footer">

          <span>
            🏆
          </span>

          <p>
            Manage • Compete • Analyze
          </p>

        </div>


      </div>

    </div>

  );

}



/* =====================================================
   APP ROUTES
===================================================== */

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* =================================================
            LOGIN
        ================================================= */}

        <Route
          path="/"
          element={<Login />}
        />



        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">

              <AdminDashboard />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN TOURNAMENTS
        ================================================= */}

        <Route
          path="/tournaments"
          element={
            <ProtectedRoute allowedRole="admin">

              <Tournaments />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            TOURNAMENT DETAILS
        ================================================= */}

        <Route
          path="/tournament-details/:id"
          element={
            <ProtectedRoute allowedRole="admin">

              <TournamentDetails />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN TEAMS
        ================================================= */}

        <Route
          path="/teams"
          element={
            <ProtectedRoute allowedRole="admin">

              <Teams />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN PLAYERS
        ================================================= */}

        <Route
          path="/players"
          element={
            <ProtectedRoute allowedRole="admin">

              <Players />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN FIXTURES
        ================================================= */}

        <Route
          path="/fixtures"
          element={
            <ProtectedRoute allowedRole="admin">

              <Fixtures />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN LIVE SCORING
        ================================================= */}

        <Route
          path="/live-scoring"
          element={
            <ProtectedRoute allowedRole="admin">

              <LiveScoring />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN LEADERBOARD
        ================================================= */}

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute allowedRole="admin">

              <Leaderboard />

            </ProtectedRoute>
          }
        />
<Route
  path="/statistics"
  element={
    <ProtectedRoute>
      <Statistics />
    </ProtectedRoute>
  }
/>


        {/* =================================================
            ADMIN VENUES
        ================================================= */}

        <Route
          path="/venues"
          element={
            <ProtectedRoute allowedRole="admin">

              <Venues />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            ADMIN REFEREES
        ================================================= */}

        <Route
          path="/referees"
          element={
            <ProtectedRoute allowedRole="admin">

              <Referees />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            NOTIFICATIONS
            BOTH ADMIN AND USER CAN ACCESS
        ================================================= */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>

              <Notifications />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            USER DASHBOARD
        ================================================= */}

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRole="user">

              <UserDashboard />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            USER TOURNAMENTS
        ================================================= */}

        <Route
          path="/user-tournaments"
          element={
            <ProtectedRoute allowedRole="user">

              <UserTournaments />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            USER FIXTURES
        ================================================= */}

        <Route
          path="/user-fixtures"
          element={
            <ProtectedRoute allowedRole="user">

              <UserFixtures />

            </ProtectedRoute>
          }
        />



        {/* =================================================
            USER LEADERBOARD
        ================================================= */}

        <Route
          path="/user-leaderboard"
          element={
            <ProtectedRoute allowedRole="user">

              <UserLeaderboard />

            </ProtectedRoute>
          }
        />


      </Routes>

    </BrowserRouter>

  );

}


export default App;