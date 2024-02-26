import { useContext, useEffect } from "react";
import { GlobalContext } from "../context/Provider";
import DataTable from "react-data-table-component";
import axios from "axios";
import { LoadingSpinner, LeadHeader } from "../components";
import { getFields } from "../context/actions/fieldActions";

const Leads = () => {
    const {
        campaignState: { campaigns, loading },
        campaignDispatch,
        fieldState: { fields },
        fieldDispatch,
        leadState: { loadingLeads, leads, selectedCampaignValue },
        leadDispatch,
    } = useContext(GlobalContext);

    const leadColumns = [
        {
            name: "Date",
            selector: (row) => <p>{row.created_at}</p>,
        },
    ];

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        getFields(fieldDispatch, selectedCampaignValue, cancelToken);

        return () => {
            cancelToken.cancel("Operation cancelled in leads");
        };
    }, [campaignDispatch, fieldDispatch, selectedCampaignValue]);

    return loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
            <LoadingSpinner />
        </div>
    ) : (
        <>
            <LeadHeader />

            <div className="mx-4 md:ml-48 bg-white rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]  m-auto mt-4 md:mx-0">
                <DataTable
                    columns={[]}
                    data={[]}
                    progressPending={loadingLeads}
                    progressComponent={<LoadingSpinner />}
                    responsive
                    selectableRowsHighlight
                    highlightOnHover
                />
            </div>
        </>
    );
};

export default Leads;
