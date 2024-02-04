import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

axios.defaults.baseURL = apiUrl;

function Login() {
    useEffect(() => {
        document.title = "TASQ - Login"
    }, [])

    const navigate = useNavigate();

    //state for input fields
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const { email, password } = input;

    //update the input fields state on change
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setInput({
            ...input,
            [name]: value
        })
    }

    //success toast
    const handleSuccess = (msg) => {
        toast.success(msg, {
            position: "bottom-left"
        })
    }

    //warning toast
    const handleWarning = (warning) => {
        toast.warning(warning, {
            position: "bottom-left"
        })
    }

    //error toast
    const handleError = (err) => {
        toast.error(err, {
            position: "bottom-left"
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(
                "auth/login",
                {
                    ...input,
                },
                { withCredentials: true }
            );

            const { warning, success, message } = data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                warning ? handleWarning(message) : handleError(message);
            }

            setInput({
                ...input,
                email: "",
                password: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-dvh bg-secondary-bg flex justify-center items-center md:bg-white">
            <div className="flex flex-col gap-8 p-8 rounded-lg md:shadow-[0_5px_10px_pink] md:bg-secondary-bg">
                <p className="self-center text-3xl font-bold text-primary">Welcome to TASQ</p>
                <form className="flex flex-col gap-4 outline-none" onSubmit={handleSubmit}>
                    <input name="email" className="input" type="text" placeholder="Email" value={email} onChange={handleOnChange} />
                    <input name="password" className="input" type="password" placeholder="Password" value={password} onChange={handleOnChange} />

                    <div className="flex flex-col gap-4">
                        <p className="text-secondary">Forgot your password?</p>
                        <input className="bg-primary text-white text-xl font-bold w-full py-2 px-4 rounded-lg hover:opacity-80" type="submit" value="LOGIN" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>By continuing you agree to TASQ’s <span className="text-secondary">Terms of Service and Privacy Policy.</span></p>
                        <hr className="bg-primary h-[0.20rem]" />
                        <p className="self-center">Not on TASQ yet? <Link to={"/signup"}><span className="text-secondary">Signup now</span></Link></p>
                    </div>
                </form>
            </div >
            <ToastContainer />
        </div >
    )
}

export default Login;
