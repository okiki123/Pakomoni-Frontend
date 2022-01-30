import React, {Fragment} from "react";
import {pure} from "recompose";
import Table from "../../../../components/table/Table";
import {NavLink} from "react-router-dom";
import moment from "moment";

const UsersTable = ({data, onSelect}) => {
    const handleClick = (row, index, column, id) => {
        onSelect(row);
    };

    const Action = () => (<div className="">Action</div>);

    const headerStyle = {
        color: "#0049AC"
    };

    const columns = [
        {
            name: 'FirstName',
            cell: (row, index) => row.full_name && row.full_name.split(' ')[0],
            sortable: true,
        },
        {
            name: 'LastName',
            cell: (row, index) => row.full_name && row.full_name.split(' ')[1],
            sortable: true,
        },
        {
            name: 'Email Address',
            selector: 'email',
            width: '250px',
            sortable: false,
        },
        {
            name: 'Phone Number',
            selector: 'phone',
            sortable: false,
        },
        {
            name: 'Date Created',
            selector: 'created_at',
            format: (row, index) => moment(row.created_at).format('ll'),
            sortable: false,
        },
        {
            name: 'Role',
            selector: 'role',
            sortable: false,
        },
        {
            name: <Action />,
            sortable: false,
            center: true,
            cell: (row, index, column, id) => {
                return (
                    <Fragment>
                        <NavLink to={`/admin/user/${row._id}`} onClick={(e) => handleClick(row, index, column, id)}>
                            View
                        </NavLink>
                    </Fragment>
                );
            }
        },
    ];

    return (
        <Table columns={columns} data={data} headerStyle={headerStyle} />
    );
};

export default pure(UsersTable);
