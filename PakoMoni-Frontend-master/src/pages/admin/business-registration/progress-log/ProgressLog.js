import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

const ProgressLog = ({ status, entity, date, text = 'updated', className = '' }) => {
    const colors = {
        'in progress': "#ffc107",
        completed: "#28a745",
        error: "#dc3545"
    };
    const titles = {
        'in progress': "In Progress",
        completed: "Completed",
        error: "Error"
    };

    const customEntity = {
        bank_account_status: 'Bank Account Status',
        name_registration_status: 'Name Registration Status',
        name_reservation_status: 'Name Reservation Status',
        tin_number: 'TIN Number Status'
    }

    const style = {
        backgroundColor: colors[status],
        width: "30px",
        height: "30px",
        borderRadius: "50%"
    }

    return (
        <div className={`border-main p-3 d-flex justify-content-between ${className}`}>
            <div className="d-flex">
                <div style={style} className="mr-3"></div>
                <div className="font-size-nm">
                    <div className="font-w600">
                        {titles[status]}
                    </div>
                    <div className="font-w100">
                        {customEntity[entity] || entity}
                    </div>
                    <div className="font-size-nm text-muted font-w100">
                        {text}
                    </div>
                </div>
            </div>
            <div className="date">
                <div className="text-muted font-w100 font-size-xs">
                    {date}
                </div>
            </div>
        </div>
    );
};

ProgressLog.propTypes = {
    status: PropTypes.oneOf(['completed', 'progress', 'error']).isRequired,
    entity: PropTypes.string.isRequired,
    text: PropTypes.string,
    date: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default pure(ProgressLog);
