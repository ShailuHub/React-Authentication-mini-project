import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Axios from "axios";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const authctx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    let url;
    const emailInput = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    if (isLogin) {
      //When a user is login
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwAu_mRTfAIChX4aCnvJZ_Nf_MkcrSFmU";
    } else {
      //When a new user creates an account
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwAu_mRTfAIChX4aCnvJZ_Nf_MkcrSFmU";
    }
    setLoading(true);
    try {
      const response = await Axios.post(
        url,
        {
          email: emailInput,
          password: password,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.idToken) {
        authctx.login(response.data.idToken);
        navigate("/");
      }
    } catch (error) {
      if (error && error.response.data.error.message) {
        //Show some error using modal
        alert(error.response.data.error.message);
        console.log(error);
      }
    }
    setLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button> {isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
