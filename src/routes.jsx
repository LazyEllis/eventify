import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Events from "./routes/Events";
import CreateEvent from "./routes/CreateEvent";
import Profile from "./routes/Profile";
import Error from "./routes/Error";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./contexts/AuthProvider";

const routes = [
  {
    element: <AuthProvider />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "events",
        element: (
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        ),
      },
      {
        path: "events/new",
        element: (
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
