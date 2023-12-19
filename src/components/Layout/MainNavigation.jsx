import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authctx = useContext(AuthContext);
  const userLoggedIn = authctx.isLoggedIn;
  const logoutHandler = () => {
    authctx.logout();
  };
  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!userLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {userLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {userLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
