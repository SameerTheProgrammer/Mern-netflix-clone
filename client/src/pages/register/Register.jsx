import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";
import { apiUrl } from "../../constant";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const emailRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
const handleFinish = async (e) => {
  e.preventDefault();
  try {
    console.log("API URL:", apiUrl);
    await axios.post(`${apiUrl}/auth/register`, { email, username, password });
    history.push("/login");
  } catch (err) {
    console.error("Error during registration:", err);
  }
};
  const handleSignInClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <button onClick={()=> history.push("/login")} className="loginButton">Sign In</button>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <p>
          Wants to login quickly without register use below data to
          <span
            style={{
              margin: "0 5px",
              "background-color": "red",
              border: "none",
              color: "white",
              "border-radius": "5px",
              padding: "5px 15px",
              "font-size": "16px",
              "font-weight": 500,
              cursor: "pointer",
            }}
            onClick={handleSignInClick}
          >
            Sign In
          </span>
          Email:- admin100@gmail.com Password:- 123456789
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
