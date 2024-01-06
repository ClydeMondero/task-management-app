import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    useEffect(() => {
        document.title = "TASQ - Signup"
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
                <p className="self-center text-3xl font-bold text-primary">Join us on TASQ</p>
                <form className="flex flex-col gap-4 outline-none" onSubmit={handleSubmit}>
                    <input name="username" className="input" type="text" placeholder="Username" />
                    <input name="email" className="input" type="text" placeholder="Email" value={email} onChange={handleOnChange} />
                    <input name="password" className="input" type="password" placeholder="Password" value={password} onChange={handleOnChange} />
                    <input name="confirmPassword" className="input" type="password" placeholder="Confirm Password" />

                    <div className="flex flex-col gap-4">
                        <input className="bg-primary text-white text-xl font-bold w-full py-2 px-4 rounded-lg hover:opacity-80" type="submit" value="SIGNUP" />
                    </div>

                    <div className="flex flex-col gap-2 ">
                        <div className="flex items-center justify-center gap-4 w-full">
                            <input className="appearance-none bg-secondary-bg mx-4 p-3 border-primary border-2 rounded-lg text-center checked:after:content-['\2713'] checked:py-0 checked:px-[0.38rem]" type="checkbox" />
                            <p>I agree to TASQ’s <span className="text-secondary">Terms of service and privacy policy.</span></p>
                        </div>
                        <hr className="bg-primary h-[0.20rem]" />
                        <p className="self-center">Already on TASQ?<Link to={"/login"}><span className="text-secondary"> Login</span></Link></p>
                    </div>
                </form>
            </div >
            <ToastContainer />
        </div >
    )
}

export default Signup;
