import React, {Fragment} from "react";
import {pure} from "recompose";
import Table from "../../../../components/table/Table";
import Button from "../../../../components/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import {NavLink} from "react-router-dom";

const BusinessesTable = () => {
    const handleClick = (row, index, column, id) => {
    };

    const Action = () => (<div className="text-center">Action</div>);

    const headerStyle = {
        color: "#0049AC"
    };

    const columns = [
        {
            name: 'Business ID',
            selector: 'business_id',
            sortable: false,
        },
        {
            name: 'Business Name',
            selector: 'business_name',
            sortable: false,
        },
        {
            name: 'Category',
            selector: 'category',
            sortable: false,
        },
        {
            name: 'BN/RC Number',
            selector: 'rc_number',
            sortable: false,
        },
        {
            name: 'TIN Number',
            selector: 'tin_number',
            sortable: false,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: false,
        },
        {
            name: <Action />,
            sortable: false,
            center: true,
            cell: (row, index, column, id) => {
                return (
                    <Fragment>
                        <NavLink to={`/admin/businesses/${row.id}`} className=""
                                 onClick={(e) => handleClick(row, index, column, id)}
                        >
                            View
                        </NavLink>
                    </Fragment>
                );
            }
        },
    ];

    const data = [
        {
            id: 1,
            business_id: "AAA/00001",
            business_name: "PakoMoni",
            category: "Technology",
            rc_number: "BN/23446",
            tin_number: "354782926390",
            status: "Active"
        },
        {
            id: 2,
            business_id: "AAA/00002",
            business_name: "PakoMoni",
            category: "Technology",
            rc_number: "BN/23447",
            tin_number: "3547825437390",
            status: "Deactivated"
        }
    ];

    return (
        <Table columns={columns} data={data} headerStyle={headerStyle} />
    );
};

export default pure(BusinessesTable);
