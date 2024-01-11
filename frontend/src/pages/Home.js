import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import  axios  from "axios";
import Header from "../components/Header";

function Home() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [user, setUser] = useState({});

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

            return status ? setUser(user) : (removeCookie("token"), navigate("/login"));
        }

        verifyCookie();
    }, [cookies, navigate, removeCookie]);


    return (
        <>
            <Header username={user.username} />
        </>
    )
}

export default Home;
