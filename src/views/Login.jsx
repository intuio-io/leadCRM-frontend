import { useContext, useRef } from "react";
import { GlobalContext } from "../context/Provider";
import { login } from "../context/actions/authActions";
import { Link } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { ButtonLoading } from "../components";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const {
        authState: { errors, loading },
        authDispatch,
    } = useContext(GlobalContext);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        login(authDispatch, payload);
    };

    return (
        <>
            <div className="my-10">
                <div className="mb-7">
                    <Link
                        className="shadow-md w-full bg-white hover:bg-indigo-500 hover:text-white  tracking-wider transition text-indigo-500 font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline"
                        to="/signup"
                    >
                        SIGN UP
                    </Link>
                </div>
                <div className="relative w-[24rem]">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-300 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 rounded-md"></div>
                    <form
                        className="bg-white px-10 py-10 rounded-md shadow-md relative"
                        onSubmit={handleFormSubmission}
                    >
                        <div className="w-full flex flex-wrap mb-4 relative">
                            <div className="absolute h-full  flex items-center pl-3 ">
                                <MdEmail className="w-5 h-5 text-gray-400 focus:text-indigo-500" />
                            </div>
                            <input
                                ref={emailRef}
                                className={`pl-10 border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-4 px-4 focus:outline-none focus:border-indigo-500 ${
                                    errors?.email && "border-red-500"
                                }`}
                                type="email"
                                placeholder="Email"
                                name="email"
                            />
                        </div>

                        <div className="w-full flex flex-wrap mb-8 relative">
                            <div className="absolute h-full  flex items-center pl-3 ">
                                <MdLock className="w-5 h-5 text-gray-400 focus:text-indigo-500" />
                            </div>
                            <input
                                ref={passwordRef}
                                className={`pl-10 border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-4 px-4 focus:outline-none focus:border-indigo-500 ${
                                    errors?.password && "border-red-500"
                                }`}
                                id="password"
                                type="password"
                                placeholder="Password"
                                name="password"
                            />
                            <p className="text-red-500 absolute mt-16 right-0 text-sm italic">
                                {errors?.email ||
                                    (errors?.password && (
                                        <span>
                                            {errors?.email}
                                            {errors?.password}
                                        </span>
                                    ))}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mb-3">
                            <button
                                disabled={loading}
                                className="w-full justify-center bg-indigo-500 inline-flex items-center transition hover:bg-indigo-600 text-white font-bold py-3 px-10 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                {loading ? <ButtonLoading /> : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
