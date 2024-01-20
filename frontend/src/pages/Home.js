import { useState, useEffect } from "react"; import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../components/Header";
import AddTask from "../components/AddTask";

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
        <div className="flex flex-col items-center h-screen w-screen bg-secondary-bg">
            <Header username={user.username} />
            <div className="flex-1 flex flex-col items-center py-10 w-4/5">
                <AddTask />
            </div>
        </div>
    )
}

export default Home;
