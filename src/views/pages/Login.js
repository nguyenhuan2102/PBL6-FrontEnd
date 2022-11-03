import "./Login.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    //console.log({ data });
    localStorage.setItem("access_token", data.access_token);
    //const a = localStorage.getItem("access_token");
    // axios.defaults.headers.common["Authorization"] = `Bearer ${a}`;

    //console.log({ a });

    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/admin/home" />;
  }
  return (
    <div className="box-form">
      <div className="left">
        <div className="overlay">
          <h1>School Management</h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>PBL6_04</p>
        </div>
      </div>

      <div className="right">
        <h5>Login</h5>
        <form onSubmit={submit}>
          <div className="inputs">
            <input
              type="text"
              placeholder="user name"
              onChange={(e) => setUser(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
