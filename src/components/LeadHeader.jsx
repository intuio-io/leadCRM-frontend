import Select from "react-select";
import { campaignClientSelectStyles } from "../utils/SelectStyles";

const LeadHeader = () => {
    const { styles, themes } = campaignClientSelectStyles;

    return (
        <>
            <div className="p-4  md:ml-48 bg-white rounded shadow-lg  m-auto -mt-48 mx-4 md:mx-0">
                <div className="relative w-96">
                    <Select
                        placeholder={`Select campaign`}
                        isSearchable
                        noOptionsMessage={() => "no results found"}
                        styles={styles(false)}
                        theme={themes}
                    />
                </div>
            </div>
        </>
    );
};

export default LeadHeader;
