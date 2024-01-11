import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

function Header(props) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(props.username);
  }, [props])

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
