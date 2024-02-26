import { MdClose } from "react-icons/md";
import { createClient, editClient } from "../context/actions/clientActions";
import { useContext } from "react";
import { GlobalContext } from "../context/Provider";
import { ButtonLoading } from "../components";

const ClientModal = () => {
    const {
        clientState: { client, edit, show, errors, loading },
        clientDispatch,
    } = useContext(GlobalContext);

    const handleChange = (e) => {
        clientDispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (edit !== true) {
            createClient(clientDispatch, client);
        }

        if (edit === true) {
            editClient(clientDispatch, client);
        }
    };

    return (
        <>
            <div className={`relative z-50  ${!show && "hidden"}`}>
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

                <div className="fixed mx-4 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  justify-center text-center items-center p-0">
                        <div className="relative transform  bg-white text-left shadow-xl transition-all my-8 w-full max-w-[34rem] overflow-hidden rounded-lg border">
                            <div className="bg-gray-50 rounded-t-lg">
                                <h1 className="px-5 py-4 text-md text-slate-700 tracking-widest font-bold">
                                    {edit ? "EDIT CLIENT" : "ADD A NEW CLIENT"}
                                </h1>
                                <button
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                    data-modal-hide="authentication-modal"
                                    onClick={() =>
                                        clientDispatch({
                                            type: "DEFAULT_STATE",
                                        })
                                    }
                                >
                                    <MdClose className="h-6 w-6 text-gray-400" />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmission}>
                                <div className="gap-6 px-5 my-7">
                                    <div>
                                        <label
                                            className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                            htmlFor="company_name"
                                        >
                                            Company name{" "}
                                            <span className="text-red-700">
                                                *
                                            </span>
                                        </label>
                                    </div>
                                    <input
                                        className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200 ${
                                            errors?.company_name &&
                                            "border-red-500"
                                        }`}
                                        id="company_name"
                                        type="text"
                                        name="company_name"
                                        placeholder="Company Name*"
                                        value={client.company_name}
                                        onChange={handleChange}
                                    />
                                    <p
                                        className={`text-xs mt-1 tracking-wide ${
                                            errors?.company_name
                                                ? "text-red-500"
                                                : "text-slate-500"
                                        } text-xs italic`}
                                    >
                                        {errors?.company_name
                                            ? errors.company_name
                                            : "Required"}
                                    </p>
                                </div>

                                <div className="lg:flex items-center justify-center gap-6 px-5">
                                    <div className="md:items-center md:justify-between mb-12 lg:w-1/2">
                                        <div>
                                            <label
                                                className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                                htmlFor="email"
                                            >
                                                Email address{" "}
                                                <span className="text-red-700">
                                                    *
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200 ${
                                                    errors?.email &&
                                                    "border-red-500"
                                                }`}
                                                id="email"
                                                type="email"
                                                name="email"
                                                placeholder="example@website.com"
                                                value={client.email}
                                                onChange={handleChange}
                                            />
                                            <p
                                                className={`text-xs  absolute left-0 -bottom-5 tracking-wide ${
                                                    errors?.email
                                                        ? "text-red-500"
                                                        : "text-slate-500"
                                                } text-xs italic`}
                                            >
                                                {errors?.email
                                                    ? errors.email
                                                    : "We'll share this with everyone"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:items-center md:justify-between mb-12 lg:w-1/2">
                                        <div>
                                            <label
                                                className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                                htmlFor="phone"
                                            >
                                                Phone{" "}
                                                <span className="text-red-700">
                                                    *
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200 ${
                                                    errors?.phone &&
                                                    "border-red-500"
                                                }`}
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                onChange={handleChange}
                                                value={client.phone}
                                                placeholder="8485802374"
                                            />
                                            <p
                                                className={`text-xs  absolute left-0 -bottom-5 tracking-wide ${
                                                    errors?.phone
                                                        ? "text-red-500"
                                                        : "text-slate-500"
                                                } text-xs italic`}
                                            >
                                                {errors?.phone
                                                    ? errors.phone
                                                    : "Your client's phone number"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:flex items-center justify-center gap-6 px-5">
                                    <div className="md:items-center md:justify-between mb-12 lg:w-1/2">
                                        <div>
                                            <label
                                                className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                                htmlFor="first_name"
                                            >
                                                First name{" "}
                                                <span className="text-red-700">
                                                    *
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200 ${
                                                    errors?.first_name &&
                                                    "border-red-500"
                                                }`}
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                onChange={handleChange}
                                                value={client.first_name}
                                                placeholder="John"
                                            />
                                            <p
                                                className={`text-xs  absolute left-0 -bottom-5 tracking-wide ${
                                                    errors?.first_name
                                                        ? "text-red-500"
                                                        : "text-slate-500"
                                                } text-xs italic`}
                                            >
                                                {errors?.first_name
                                                    ? errors.first_name
                                                    : "Your client's first name"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="md:items-center md:justify-between mb-12 lg:w-1/2">
                                        <div>
                                            <label
                                                className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                                htmlFor="last_name"
                                            >
                                                Last name{" "}
                                                <span className="text-red-700">
                                                    *
                                                </span>
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200 ${
                                                    errors?.last_name &&
                                                    "border-red-500"
                                                }`}
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                onChange={handleChange}
                                                value={client.last_name}
                                                placeholder="Doe"
                                            />

                                            <p
                                                className={`text-xs  absolute left-0 -bottom-5 tracking-wide ${
                                                    errors?.last_name
                                                        ? "text-red-500"
                                                        : "text-slate-500"
                                                } text-xs italic`}
                                            >
                                                {errors?.last_name
                                                    ? errors.last_name
                                                    : "Your client's last name"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className={`inline-flex justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ml-3 w-auto tracking-wide ${
                                            loading && "cursor-not-allowed"
                                        }`}
                                    >
                                        {loading ? <ButtonLoading /> : "Save"}
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-auto tracking-wide"
                                        onClick={() =>
                                            clientDispatch({
                                                type: "DEFAULT_STATE",
                                            })
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientModal;
