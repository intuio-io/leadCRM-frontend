import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import Select from "react-select";
import { MdClose } from "react-icons/md";
import { campaignFieldTypeOptions } from "../utils/SelectOptions";
import { campaignClientSelectStyles } from "../utils/SelectStyles";
import { createField, editField } from "../context/actions/fieldActions";
import ButtonLoading from "./ButtonLoading";

const CampaignFieldModal = ({ campaignId }) => {
    const {
        fieldState: {
            showFieldForm,
            field,
            selectedValue,
            edit,
            errors,
            loading,
        },
        fieldDispatch,
    } = useContext(GlobalContext);

    // select options custom styles
    const { styles, themes } = campaignClientSelectStyles;

    useEffect(() => {
        fieldDispatch({ type: "UPDATE_CAMPAIGN_ID", payload: campaignId });
    }, [fieldDispatch, campaignId, showFieldForm]);

    const handleInputChange = (e) => {
        fieldDispatch({
            type: "CHANGE_INPUT",
            payload: { name: e.target.name, value: e.target.value },
        });
    };

    // for get the selected value
    const handleSelectChange = (e) => {
        return fieldDispatch({
            type: "GET_SELECT_VALUE",
            payload: e,
        });
    };

    const handleFormSubmission = (e) => {
        e.preventDefault();

        if (edit !== true) {
            createField(fieldDispatch, {
                ...field,
                field_type: selectedValue?.value,
            });
        }

        if (edit) {
            editField(fieldDispatch, {
                ...field,
                field_type: selectedValue?.value,
            });
        }
    };

    return (
        <>
            <div className={`relative z-50  ${!showFieldForm && "hidden"}`}>
                <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"></div>

                <div className="fixed mx-4 inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full  justify-center text-center items-center p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all my-8 w-full max-w-lg">
                            <div className="bg-white">
                                <div className="bg-gray-50">
                                    <h1 className="px-5 py-4 text-md text-slate-700 tracking-widest font-bold">
                                        {!edit ? "ADD FIELD" : "EDIT FIELD"}
                                    </h1>
                                    <button
                                        type="button"
                                        className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                                        data-modal-hide="authentication-modal"
                                        onClick={() =>
                                            fieldDispatch({
                                                type: "DEFAULT_STATE",
                                            })
                                        }
                                    >
                                        <MdClose className="h-6 w-6 text-gray-400" />
                                    </button>
                                </div>

                                <form onSubmit={handleFormSubmission}>
                                    <div className="lg:flex items-center justify-center gap-6 px-5 pt-7">
                                        <div className="md:items-center md:justify-between mb-10 lg:w-1/2">
                                            <div>
                                                <label
                                                    className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-4 pr-10"
                                                    htmlFor="field_name"
                                                >
                                                    Name{" "}
                                                    <span className="text-red-700">
                                                        *
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="relative text-slate-500">
                                                <input
                                                    className={`appearance-none border-[1.9px] border-gray-200 rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200 ${
                                                        errors?.field_name &&
                                                        "border-red-500"
                                                    }`}
                                                    id="field_name"
                                                    name="field_name"
                                                    type="text"
                                                    placeholder="Field name"
                                                    value={field.field_name}
                                                    onChange={handleInputChange}
                                                />
                                                <p
                                                    className={` text-xs  absolute left-0 -bottom-5 tracking-wide italic ${
                                                        errors?.field_name &&
                                                        "text-red-500"
                                                    }`}
                                                >
                                                    {errors?.field_name
                                                        ? `${errors.field_name}`
                                                        : "Filter purpose"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="md:items-center mb-10 lg:w-1/2 md:justify-between">
                                            <div>
                                                <label className="block text-slate-600 text-sm tracking-wider font-bold text-md mb-1 md:mb-4 pr-10">
                                                    Type{" "}
                                                    <span className="text-red-700">
                                                        *
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="relative text-slate-500">
                                                <Select
                                                    options={
                                                        campaignFieldTypeOptions
                                                    }
                                                    placeholder="Types"
                                                    name="field_type"
                                                    value={selectedValue}
                                                    onChange={
                                                        handleSelectChange
                                                    }
                                                    styles={styles(
                                                        errors?.field_type
                                                    )}
                                                    theme={(theme) =>
                                                        themes(theme)
                                                    }
                                                />

                                                <p
                                                    className={` text-xs  absolute left-0 -bottom-5 tracking-wide italic ${
                                                        errors?.field_name &&
                                                        "text-red-500"
                                                    }`}
                                                >
                                                    {errors?.field_name
                                                        ? `${errors.field_name}`
                                                        : " What type do you expect ?"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-6 gap-6 px-5">
                                        <div>
                                            <label
                                                className="block text-slate-600 text-sm tracking-wider font-bold mb-1 md:mb-[1.2rem] pr-10"
                                                htmlFor="field_description"
                                            >
                                                Description
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <textarea
                                                className="resize-none appearance-none border-[1.9px] border-gray-200 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:bg-white  focus:border-indigo-200"
                                                name="field_description"
                                                id="field_description"
                                                rows="3"
                                                placeholder="Field description"
                                                value={
                                                    field.field_description ||
                                                    ""
                                                }
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse">
                                        <button
                                            type="submit"
                                            className={`inline-flex justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 ml-3 w-auto tracking-wide ${
                                                loading && "cursor-not-allowed"
                                            }`}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <ButtonLoading />
                                            ) : (
                                                "Save"
                                            )}
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-auto tracking-wide"
                                            onClick={() =>
                                                fieldDispatch({
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
            </div>
        </>
    );
};

export default CampaignFieldModal;
