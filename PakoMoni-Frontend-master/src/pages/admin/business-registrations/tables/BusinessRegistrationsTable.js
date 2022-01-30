import React, {Fragment} from "react";
import {pure} from "recompose";
import Table from "../../../../components/table/Table";
import {NavLink} from "react-router-dom";
import moment from "moment"

const BusinessRegistrationsTable = ({data, changeBusinessRegistration}) => {
    const handleClick = (row, index, column, id) => {
        changeBusinessRegistration(row);
    };

    const Action = () => (<div className="text-center">Action</div>);

    const headerStyle = {
        color: "#0049AC"
    };

    const columns = [
        {
            name: 'Date',
            selector: 'created_at',
            format: (row, index) => moment(row.created_at).format('ll'),
            sortable: true,
        },
        {
            name: 'Owner',
            cell: (row, index, column, id) => (<span>{row.owner && row.owner.full_name}</span>),
            sortable: false,
        },
        {
            name: 'Business Name',
            cell: (row, index, column, id) => (<span>{row.names && row.names[0] || 'null'}</span>),
            sortable: false,
        },
        {
            name: 'Category',
            selector: 'category',
            sortable: false,
        },
        {
            name: 'Payment Type',
            selector: 'payment_type',
            sortable: false,
        },
        {
            name: 'Handler',
            cell: (row, index, column, id) => (<span>{row.handler && row.handler.full_name}</span>),
            sortable: false,
        },
        // {
        //     name: 'Status',
        //     selector: 'status',
        //     sortable: false,
        // },
        {
            name: <Action />,
            sortable: false,
            center: true,
            cell: (row, index, column, id) => {
                return (
                    <Fragment>
                        <NavLink to={`/admin/business-registration/${row._id}`} className=""
                                onClick={(e) => handleClick(row, index, column, id)}
                        >
                            View
                        </NavLink>
                    </Fragment>
                );
            }
        },
    ];

    return (
        <Table pagination={true} columns={columns} data={data} headerStyle={headerStyle} />
    );
};

export default pure(BusinessRegistrationsTable);
