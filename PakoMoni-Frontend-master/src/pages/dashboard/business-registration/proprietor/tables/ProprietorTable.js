import React from "react";
import {pure} from "recompose";
import Table from "../../../../../components/table/Table";

const ProprietorTable = ({data}) => {
    const columns = [
        {
            name: 'Proprietor Name',
            selector: 'full_name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Phone Number',
            selector: 'phone',
            sortable: false
        },
        {
            name: 'Address',
            selector: 'address',
            sortable: false
        },
    ];

    return (
        <Table pagination={false} columns={columns} data={data} />
    );
};

export default pure(ProprietorTable);
