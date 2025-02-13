import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Error from "./routes/Error";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];

export default routes;
