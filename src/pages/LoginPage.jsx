import React , {useEffect} from "react";
import Login from "../components/Login";
import { Link , useNavigate} from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    //console.log(document.cookie);
    if (localStorage.getItem("user-id")) {
      // var cookie = decodeURIComponent(document.cookie);
      //var userrId = cookie.substring(15, cookie.length - 1);
      navigate(`/home/${localStorage.getItem("user-id")}`);
    }
  }, []);
  return (
    <div>
      <h3 className="text-center mb-4 mt-4">Login</h3>
      <Login />
      <div
        style={{ width: "100%" }}
        className="d-flex mt-4 justify-content-center align-items-center w-100 flex-column"
      >
        <p style={{ margin: 0 }}>Not registered?</p>
        <Link to="/" className="btn btn-secondary my-2">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
