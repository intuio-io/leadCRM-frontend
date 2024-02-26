import { useContext, useRef } from "react";
import { GlobalContext } from "../context/Provider";
import { signup } from "../context/actions/authActions";
import { Link } from "react-router-dom";
import { ButtonLoading } from "../components";
import { SignupSvg } from "../utils/Svgs";

const Signup = () => {
    const {
        authState: { errors, loading },
        authDispatch,
    } = useContext(GlobalContext);

    const fNameRef = useRef();
    const lNameRef = useRef();
    const companyNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const payload = {
            first_name: fNameRef.current.value,
            last_name: lNameRef.current.value,
            company_name: companyNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        signup(authDispatch, payload);
    };

    return (
        <>
            <div className="md:flex w-full px-4">
                <div className="hidden lg:block w-1/2 bg-indigo-500">
                    <SignupSvg />
                </div>

                <div className="md:w-full lg:w-1/2 py-10 sm:px-10 max-w-xl mx-auto lg:mx-0 lg:bg-indigo-100">
                    <div className="flex justify-end">
                        <Link
                            className="shadow-md bg-white hover:bg-indigo-500 hover:text-white  tracking-wider transition text-indigo-500 font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline mb-3"
                            to="/login"
                        >
                            LOGIN
                        </Link>
                    </div>
                    <form
                        className="bg-white px-10 py-10 rounded-md shadow-md"
                        onSubmit={handleFormSubmission}
                    >
                        <div className="flex flex-wrap mb-3">
                            <div className="w-full md:w-1/2 mb-3 md:mb-0 pr-2">
                                <input
                                    ref={fNameRef}
                                    className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2  rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:border-indigo-500 ${
                                        errors?.first_name && "border-red-500"
                                    }`}
                                    id="first-name"
                                    type="text"
                                    name="first_name"
                                    placeholder="Your first name"
                                />

                                <p
                                    className={`${
                                        errors?.first_name
                                            ? "text-red-500"
                                            : "text-gray-600"
                                    } text-xs italic`}
                                >
                                    {errors?.first_name
                                        ? errors?.first_name
                                        : "Required"}
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 pl-2">
                                <input
                                    ref={lNameRef}
                                    className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-3 px-4 leading-tight focus:outline-none focus:border-indigo-500 ${
                                        errors?.last_name && "border-red-500"
                                    }`}
                                    id="last-name"
                                    type="text"
                                    name="last_name"
                                    placeholder="Your last name"
                                />
                                <p
                                    className={`${
                                        errors?.last_name
                                            ? "text-red-500"
                                            : "text-gray-600"
                                    } text-xs italic md:hidden`}
                                >
                                    {errors?.last_name
                                        ? errors?.last_name
                                        : "Required"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap mb-3">
                            <input
                                ref={companyNameRef}
                                className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:border-indigo-500 ${
                                    errors?.company_name && "border-red-500"
                                }`}
                                id="company-name"
                                type="text"
                                name="company_name"
                                placeholder="Company name"
                            />
                            <p
                                className={`${
                                    errors?.company_name
                                        ? "text-red-500"
                                        : "text-gray-600"
                                } text-xs italic`}
                            >
                                {errors?.company_name
                                    ? errors?.company_name
                                    : "Required"}
                            </p>
                        </div>

                        <div className="flex flex-wrap mb-3">
                            <input
                                ref={emailRef}
                                className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:border-indigo-500 ${
                                    errors?.email && "border-red-500"
                                }`}
                                id="email"
                                type="Email"
                                name="email"
                                placeholder="Email"
                            />
                            <p
                                className={`${
                                    errors?.email
                                        ? "text-red-500"
                                        : "text-gray-600"
                                } text-xs italic`}
                            >
                                {errors?.email ? errors?.email : "Required"}
                            </p>
                        </div>

                        <div className="flex flex-wrap mb-3">
                            <input
                                ref={phoneRef}
                                className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:border-indigo-500 ${
                                    errors?.phone && "border-red-500"
                                }`}
                                id="phone"
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                            />
                            <p
                                className={`${
                                    errors?.phone
                                        ? "text-red-500"
                                        : "text-gray-600"
                                } text-xs italic`}
                            >
                                {errors?.phone ? errors?.phone : "Required"}
                            </p>
                        </div>

                        <div className="flex flex-wrap mb-3">
                            <input
                                ref={passwordRef}
                                className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:border-indigo-500 ${
                                    errors?.password && "border-red-500"
                                }`}
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Create a password"
                            />
                            <p
                                className={`${
                                    errors?.password
                                        ? "text-red-500"
                                        : "text-gray-600"
                                } text-xs italic`}
                            >
                                {errors?.password
                                    ? errors?.password
                                    : "Min. 6 characters, with letters and symbols"}
                            </p>
                        </div>

                        <div className="flex flex-wrap mb-4">
                            <input
                                ref={passwordConfirmationRef}
                                className={`border-slate-200 transition appearance-none block w-full text-gray-700 border-2 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:border-indigo-500 ${
                                    errors?.password && "border-red-500"
                                }`}
                                id="repeat-password"
                                type="password"
                                name="confirm_password"
                                placeholder="Confirm your password"
                            />
                            {!errors?.password && (
                                <p className="text-gray-600 text-xs italic">
                                    Required
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap mb-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`inline-flex justify-center w-full items-center px-4 py-3 font-semibold leading-6 text-white transition duration-150 ease-in-out bg-indigo-500 rounded-md shadow  hover:bg-indigo-600 ${
                                    loading && "cursor-not-allowed "
                                }`}
                            >
                                {loading ? <ButtonLoading /> : "Continue"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;
