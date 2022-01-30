import React, {Fragment} from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import ReactDateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from "moment";

const DateRangePicker = ({ label, startDate, endDate, opens = 'left', showWeekNumbers = false,
                             placeholder = 'Select Duration', onApply, classNames = 'form-control' }) => {
    const initialSettings = {
        startDate: startDate,
        endDate: endDate,
        opens: opens,
        showWeekNumbers: showWeekNumbers,
        applyButtonClasses: 'Btn Btn-orange text-white',
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
    }

    return (
        <div className="mb-4">
            {
                label &&
                <label className="mb-0 font-w600 font-size-nm">
                    Duration
                </label>
            }
            <ReactDateRangePicker
                initialSettings={initialSettings}
                onApply={onApply}
            >
                <input type="text" className={`${classNames}`} placeholder={placeholder} />
            </ReactDateRangePicker>
        </div>
    );
};

DateRangePicker.propTypes = {
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    opens: PropTypes.oneOf(['left', 'right', 'center']),
    showWeekNumbers: PropTypes.bool,
    onApply: PropTypes.func
};

export default pure(DateRangePicker);
