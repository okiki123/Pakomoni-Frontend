import React from "react";
import {pure} from "recompose";
import PropTypes from "prop-types";
import DataTable from 'react-data-table-component';

const Table = ({columns, data, title, headerStyle = {}, pagination = true, paginationPerPage = 10, striped = true}) => {

    const baseHeaderStyle = {
        fontSize: "16px",
        fontWeight: "600",
        borderLeft: "solid 1px #dbe2e8",
    };

    const customStyles = {
        rows: {
            style: {
            }
        },
        headCells: {
            style: {
                ...baseHeaderStyle, ...headerStyle
            },
        },
        cells: {
            style: {
                fontSize: "14px",
                borderLeft: "solid 1px #dbe2e8"
            },
        },
    };

    return (
        <div className="border-main-top border-main-right border-main-bottom">
            <DataTable
                columns={columns}
                data={data}
                title={title}
                pagination={pagination}
                paginationPerPage={paginationPerPage}
                striped={striped}
                customStyles={customStyles}
            />
        </div>
    )
}

Table.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array,
    title: PropTypes.string,
    headerStyle: PropTypes.any,
    pagination: PropTypes.bool,
    striped: PropTypes.bool,
    paginationPerPage: PropTypes.number

};

export default pure(Table);
