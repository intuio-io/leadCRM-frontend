/* eslint-disable react-refresh/only-export-components */
import { Link } from "react-router-dom";

export const customStyles = {
    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: "0.9rem",
        },
    },

    cells: {
        style: {
            fontSize: "0.9rem",
        },
    },

    rows: {
        highlightOnHoverStyle: {
            backgroundColor: "rgb(235, 245, 251)",
        },
    },

    pagination: {
        style: {
            color: "white",
        },
    },
};

export const clientStyles = {
    headRow: {
        style: {
            border: "none",
        },
    },

    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: "0.9rem",
        },
    },

    cells: {
        style: {
            fontSize: "0.9rem",
        },
    },

    rows: {
        style: {
            height: "4rem",
            display: "flex",
            alignItems: "start",
            paddingTop: "0.6rem",
            "&:not(:last-of-type)": {
                border: "none",
            },
        },
    },
};

export const fieldStyles = {
    headCells: {
        style: {
            fontWeight: "bold",
            fontSize: "0.9rem",
            letterSpacing: "0.5px",
        },
    },

    cells: {
        style: {
            fontSize: "0.9rem",
        },
    },

    rows: {
        highlightOnHoverStyle: {
            backgroundColor: "rgb(235, 245, 251)",
        },
    },
};

// columns

export const CampaignClientTable = (type) => {
    const column = [
        {
            name: "ID",
            selector: (row) => <p>{row.id}</p>,
            style: {
                fontWeight: "bold",
            },
        },
        {
            name: "CLIENT",
            selector: (row) => (
                <div>
                    {(row.supplier_nickname || row.buyer_nickname) && (
                        <div>
                            <p className="font-bold text-md mb-2.5">
                                {type === "supplier"
                                    ? row.supplier_nickname
                                    : row.buyer_nickname}
                            </p>
                            <p className="text-xs">
                                {type === "supplier"
                                    ? row.supplier_name
                                    : row.buyer_name}
                            </p>
                        </div>
                    )}

                    {!(row.supplier_nickname || row.buyer_nickname) && (
                        <div>
                            <p className="font-bold text-md mb-2.5">
                                {type === "supplier"
                                    ? row.supplier_name
                                    : row.buyer_name}
                            </p>

                            <Link
                                to={`/campaigns/${row.campaign_id}/${type}/${row.id}`}
                            >
                                <p className="text-xs text-indigo-500">
                                    Set nickname
                                </p>
                            </Link>
                        </div>
                    )}
                </div>
            ),

            style: { letterSpacing: "0.5px", width: "16rem" },
        },
        {
            name: "REQUESTS",
            selector: (row) => (
                <div>
                    <p className="pt-0.5rem">
                        <span className="text-green-500">{row.requests}</span>{" "}
                        accepted
                    </p>
                </div>
            ),
        },
    ];
    return column;
};

export const clientColumns = [
    {
        name: "COMPANY",
        selector: (row) => row.company_name,
        sortable: true,
        style: { fontWeight: "bold" },
    },
    {
        name: "EMAIL",
        selector: (row) => row.email,
    },
    {
        name: "FIRST NAME",
        selector: (row) => row.first_name,
    },
    {
        name: "LAST NAME",
        selector: (row) => row.last_name,
        omit: true,
    },
    {
        name: "PHONE",
        selector: (row) => row.phone,
        omit: true,
    },
];

export const campaignColumns = [
    {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
        style: { fontWeight: "bold" },
    },
    {
        name: "CAMPAIGN NAME",
        selector: (row) => row.campaign_name,
    },
];

export const fieldColumns = [
    {
        name: "NAME & DESCRIPTION",
        selector: (row) => <p>{row.field_name}</p>,
    },
    {
        name: "TYPE & FORMAT",
        selector: (row) => (
            <p>
                {(row.field_type === "String" && "Text") ||
                    (row.field_type === "Int" && "Number") ||
                    (row.field_type === "Email" && "Email")}
            </p>
        ),
    },
    {
        name: "STATUS",
        selector: () => (
            <p className="text-red-700 italic">
                Required<span className="invisible">d</span>
            </p>
        ),
    },
];

export const filterColumns = [
    {
        name: "FILTER FIELD",
        selector: (row) => row.filter_type,
    },
    {
        name: "CONDITION",
        selector: (row) => (
            <p className="text-indigo-500 italic">{row.filter_condition}</p>
        ),
    },
    {
        name: "VALUE",
        selector: (row) => row.filter_value,
    },
];

// conditional styles

export const conditionalClientStyles = [
    {
        when: (row) => row.num % 2 !== 0,
        style: {
            backgroundColor: "rgba(244, 246, 247)",
        },
    },
];
