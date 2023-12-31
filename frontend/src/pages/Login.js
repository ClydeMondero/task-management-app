import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
                "http://localhost:4000/auth/login",
                {
                    ...input,
                },
                { withCredentials: true }
            );

            console.log(data);

            const { success, message } = data;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                handleError(message);
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
        <div className="flex items-center justify-center h-lvh">
            <div className="flex flex-col gap-8 p-8 bg-secondary-bg h-max w-1/3 rounded-lg">
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
