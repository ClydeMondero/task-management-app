function Login() {
    return (
        <div className="flex items-center justify-center h-lvh">
            <div className="flex flex-col gap-8 p-8 bg-secondary-bg h-3/4 w-1/3 rounded-lg">
                <p className="self-center text-3xl font-bold text-primary">Welcome to TASQ</p>
                <form className="flex flex-col gap-4">
                    <input className="input" type="text" placeholder="Email or Username" />
                    <input className="input" type="password" placeholder="Password" />

                    <div className="flex flex-col gap-4">
                        <p className="text-secondary">Forgot your password?</p>
                        <input className="bg-primary text-white text-xl font-bold w-full py-2 px-4 rounded-lg" type="submit" value="LOGIN" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>By continuing you agree to TASQ’s <span className="text-secondary">Terms of service and privacy policy.</span></p>
                        <hr className="bg-primary h-[0.20rem]" />
                        <p className="self-center">Not on TASQ yet? <span className="text-secondary">Signup now</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
