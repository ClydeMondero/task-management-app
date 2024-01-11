import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      //check if user is logged in
      if (!cookies.token) {
        navigate("/login");
      }

      const { data } = await axios.post(
        "http://localhost:4000/auth/",
        {},
        { withCredentials: true }
      )

      const { status, user } = data;

      return status ? setUsername(user) : (removeCookie("token"), navigate("/login"));
    }

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  }

  return (
    <>
      <div className="bg-primary w-screen h-20 rounded-b-3xl flex items-center justify-between px-24 text-white">
        <p className="font-bold text-4xl">TASQ</p>

        <div className="flex align-center gap-4 text-xl">
          <p className="font-bold">{username}</p>
          <vr className="w-[0.1rem] h-8 bg-secondary-bg rounded-lg" />
          <p className="cursor-pointer" onClick={Logout}>Logout</p>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Header;
