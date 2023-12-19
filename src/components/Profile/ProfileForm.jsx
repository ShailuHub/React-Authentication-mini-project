import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import Axios from "axios";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const newPasswordInput = useRef();
  const navigate = useNavigate();
  const authctx = useContext(AuthContext);
  const changePasswordHandler = async (event) => {
    event.preventDefault();
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDwAu_mRTfAIChX4aCnvJZ_Nf_MkcrSFmU`;
    try {
      const response = await Axios.post(
        url,
        {
          idToken: authctx.token,
          password: newPasswordInput.current.value,
          returnSecureToken: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordInput} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
