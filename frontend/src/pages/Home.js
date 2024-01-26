import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import Task from "../components/Task";

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
        <div className="flex flex-col items-center h-screen w-screen">
            <Header username={user.username} />
            <div className="flex-1 flex flex-col items-center gap-4 py-6 w-4/5">
                <AddTask />
                <div className="flex flex-col items-center gap-4 w-full h-[380px] bg-secondary-bg py-8 rounded-lg overflow-auto">
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                    <Task />
                </div>
            </div>
        </div>
    )
}

export default Home;
