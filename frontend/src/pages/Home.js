import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import Task from "../components/Task";
import moment from "moment"

function Home() {
    useEffect(() => {
        document.title = "TASQ - Home"
    }, [])

    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const verifyCookie = async () => {
            //check if user is logged in
            if (!cookies.token) {
                navigate("/login");
            }

            const { data } = await axios.post(
                //"http://localhost:4000/auth/",
                "https://tasq.onrender.com/auth/",
                {},
                { withCredentials: true }
            )

            const { status, user } = data;

            return status ? setUser(user) : (removeCookie("token"), navigate("/login"));
        }

        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const getTasks = async () => {
        const { data } = await axios.get(
            //"http://localhost:4000/tasks/get",
            "https://tasq.onrender.com/tasks/get",
            { withCredentials: true }
        );

        console.log(data);

        setTasks(data);
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div className="flex flex-col items-center h-screen w-screen">
            <Header username={user.username} />
            <div className="flex-1 flex flex-col items-center gap-4 py-6 w-4/5">
                <AddTask onAdd={getTasks} />
                <div className="flex flex-col items-center gap-2 w-full h-[380px] bg-secondary-bg py-8 rounded-lg overflow-auto">
                    {tasks.map(task => (
                        <Task
                            onDelete={getTasks}
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            dueDate={
                                task.dueDate ? moment(task.dueDate).fromNow() : ""
                            }
                            isCompleted={task.isCompleted}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;
