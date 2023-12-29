import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FakePage from "./pages/fakePage/FakePage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import Dashboard from "./pages/dashboard/Dashboard";
import ScheduleEdit from "./pages/scheduleEdit/ScheduleEdit";
import Share from "./components/share/Share";
import Comment from "./pages/comment/Comment";
import PosterProfile from "./pages/posterProfile/PosterProfile";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />}></Route>
        <Route path="/fakePage" element={<FakePage />}></Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        ></Route>
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        ></Route>
        <Route
          path="/scheduleedit/:id"
          element={user ? <ScheduleEdit /> : <Navigate to="/" />}
        ></Route>

        <Route path="/profile" element={<Profile />}></Route>

        <Route path="/share" element={<Share />}></Route>
        <Route path="/comment" element={<Comment />}></Route>

        <Route path="/profile/:id" element={<PosterProfile />}></Route>
      </Routes>
    </Router>
  );

  // return (
  //   <Share />
  // );
}

export default App;
