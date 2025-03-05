import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Events from "./routes/Events";
import MyEvents from "./routes/MyEvents";
import EventDetails from "./routes/EventDetails";
import Profile from "./routes/Profile";
import Tickets from "./routes/Tickets";
import TicketDetails from "./routes/TicketDetails";
import PaymentVerification from "./routes/PaymentVerification";
import EventMessages from "./routes/EventMessages";
import EventAnalytics from "./routes/EventAnalytics";
import EventAttendees from "./routes/EventAttendees";
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
        path: "my-events",
        element: (
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
        ),
      },
      {
        path: "events/:id",
        element: (
          <ProtectedRoute>
            <EventDetails />
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
      {
        path: "tickets",
        element: (
          <ProtectedRoute>
            <Tickets />
          </ProtectedRoute>
        ),
      },
      {
        path: "tickets/:id",
        element: (
          <ProtectedRoute>
            <TicketDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment/verify",
        element: (
          <ProtectedRoute>
            <PaymentVerification />
          </ProtectedRoute>
        ),
      },
      {
        path: "events/:id/messages",
        element: (
          <ProtectedRoute>
            <EventMessages />
          </ProtectedRoute>
        ),
      },
      {
        path: "events/:id/analytics",
        element: (
          <ProtectedRoute>
            <EventAnalytics />
          </ProtectedRoute>
        ),
      },
      {
        path: "events/:id/attendees",
        element: (
          <ProtectedRoute>
            <EventAttendees />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default routes;
