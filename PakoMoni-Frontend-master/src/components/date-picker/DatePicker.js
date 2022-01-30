import 'date-fns';
import React from 'react';
import {pure} from "recompose";
import PropTypes from "prop-types";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {makeStyles} from "@material-ui/core/styles";

const DatePicker = ({ label, error, name, placeholder, value = null, format = "dd/MM/yyyy", onDateChange, ...rest}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            fontSize: '14px',
            '&:hover $notchedOutline': {
                borderColor: '#EEEEEE'
            },
            '&:focus $notchedOutline': {
                borderColor: '#EEEEEE'
            },
            '&:active $notchedOutline': {
                borderColor: '#EEEEEE'
            },
        },
        focused: {},
        notchedOutline: {}
    }));

    const classes = useStyles();

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="form-group">
                {
                    label && <label className={`font-size-nm font-weight-bold text-dark-color ${error ? 'text-danger' : ''}`} htmlFor={name}>{label}</label>
                }
                <KeyboardDatePicker
                    // disableToolbar
                    className={`w-100 ${error ? 'border-danger' : ''}`}
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    margin="none"
                    value={value}
                    id={name}
                    placeholder={placeholder}
                    onChange={onDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    maxDate={new Date()}
                    InputProps={{
                        classes: {
                            root: classes.root,
                            focused: classes.focused,
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                />
                {
                    error && <small id="emailHelp" className="form-text text-danger">{error}</small>
                }
            </div>
        </MuiPickersUtilsProvider>
    );
}

export default pure(DatePicker);
