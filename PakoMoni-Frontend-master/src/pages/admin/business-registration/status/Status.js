import React, {useEffect, useState} from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";

const Status = ({ progress }) => {
    const colors = {
        'in progress': "badge-warning",
        completed: "badge-success",
        error: "badge-danger"
    };

    const [status, setStatus] = useState('progress');
    const [entity, setEntity] = useState('name_reservation_status');

    const fullEntityName = {
        bank_account_status: 'Bank Account',
        name_registration_status: 'Name Registration',
        name_reservation_status: 'Name Reservation',
        tin_number: 'TIN Number'
    };

    useEffect(() => {
        getActiveState();
    }, [progress]);

    const getActiveState = () => {
        const name_reservation_status = progress.find(item => item.name === 'name_reservation_status');
        const name_registration_status = progress.find(item => item.name === 'name_registration_status');
        const tin_number_status = progress.find(item => item.name === 'tin_number_status');
        const bank_account_status = progress.find(item => item.name === 'bank_account_status');

        if (bank_account_status) {
            setEntity(bank_account_status.name)
            setStatus(bank_account_status.status)
        }
        else if (!bank_account_status && tin_number_status) {
            setEntity(tin_number_status.name)
            setStatus(tin_number_status.status)
        }
        else if (!tin_number_status && name_registration_status) {
            setEntity(name_registration_status.name)
            setStatus(name_registration_status.status)
        }
        else if (!name_registration_status && name_reservation_status) {
            setEntity(name_reservation_status.name)
            setStatus(name_reservation_status.status)
        }
    }

    return (
        <span className={`badge text-white ${colors[status]}`}>{`${fullEntityName[entity]} ${status}`}</span>
    );
};

Status.propTypes = {
    progress: PropTypes.array.isRequired
};

export default pure(Status);
