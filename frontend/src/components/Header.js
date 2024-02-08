import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(props.username);
  }, [props]);

  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="
        bg-primary w-screen h-20 flex items-center justify-around py-4 text-white md:justify-between md:px-20 lg:px-28 xl:px-32">
        <p className="font-bold text-4xl">TASQ</p>

        <div className="flex items-center gap-4 text-xl">
          <p className="font-bold">{username}</p>
          <vr className="w-[0.1rem] h-8 bg-secondary-bg rounded-lg" />
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={Logout}
            icon={faArrowRightFromBracket}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
