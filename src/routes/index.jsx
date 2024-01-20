import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Filme from "../pages/Filme";
import Favoritos from "../pages/Favoritos";
import Erro from "../pages/Erro";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Private from "./Private";
import UserDetails from "../pages/UserDetails";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filme/:id" element={<Filme />} />
      <Route
        path="/favoritos"
        element={
          <Private>
            <Favoritos />
          </Private>
        }
      />
      <Route
        path="/userdetails"
        element={
          <Private>
            <UserDetails />
          </Private>
        }
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<Erro />} />
    </Routes>
  );
}

export default RoutesApp;
