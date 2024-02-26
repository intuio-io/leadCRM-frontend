import { useContext } from "react";
import { GlobalContext } from "../context/Provider";
import { IoWarningOutline } from "react-icons/io5";
import { resetField } from "../context/actions/fieldActions";

const ResetModal = ({ campaignId }) => {
    const {
        fieldState: { showResetModal },
        fieldDispatch,
    } = useContext(GlobalContext);

    const handleReset = (e) => {
        e.preventDefault();
        resetField(fieldDispatch, { campaignId });
    };

    return (
        <>
            <div className={`relative z-50 ${!showResetModal && "hidden"}`}>
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

                <div className="fixed mx-4 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  justify-center text-center items-center p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <IoWarningOutline className="h-6 w-6 text-indigo-500" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3
                                            className="text-base tracking-wide font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            Reset campaign fields
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 mb-2">
                                                Reseting the fields will also
                                                remove any configured filters,
                                                integrations. Are you sure you
                                                want to continue?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    onClick={handleReset}
                                    className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto tracking-wide"
                                >
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto tracking-wide"
                                    onClick={() =>
                                        fieldDispatch({
                                            type: "CLOSE_RESET_MODAL",
                                        })
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetModal;
