import React, {Fragment, useState} from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import Select from "../select/Select";
import Input from "../input/Input";
import DateRangePicker from "../date-range-picker/DateRangePicker";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import {makeStyles} from "@material-ui/core";

const SingleFilter = ({filterOptions = [], id, onRemove, onSetFilter}) => {
    const [filter, setFilter] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);

    const useStyles = makeStyles((theme) => ({
        closeButton: {
            color: theme.palette.grey[500],
            marginLeft: "10px",
            fontSize: "5px",
            padding: "10px",
            marginBottom: "1rem"
        },
    }));

    const classes = useStyles();



    const filterSelect = filterOptions.map(item => {return {...item, value: item.name}});

    const handleChange = (e) => {
        setFilter(prevState => e.target.value);
        setSelectedFilter(prevState => filterOptions.find(item => item.name === e.target.value));
    }

    const handleFilterChange = (e) => {
        const data = {
            filter: filter,
            value: e.currentTarget.value,
            id: id
        }
        onSetFilter(data);
    }

    const handleRemove = () => {
        onRemove(id);
    }

    return (
        <div className="d-flex align-items-center">
            <div className="row flex-grow-1">
                <div className="col-lg-6">
                    <Select
                        value={filter}
                        placeholder="Select Filter"
                        className="form-control-sm font-size-nm"
                        name={id}
                        options={filterSelect}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-lg-6">
                    {
                        selectedFilter &&
                            <Fragment>
                                {
                                    selectedFilter.type === 'select' &&
                                    <Select
                                        placeholder={`Select ${selectedFilter.label}`}
                                        className="form-control-sm font-size-nm"
                                        name={selectedFilter.name}
                                        options={selectedFilter.options}
                                        onChange={handleFilterChange}
                                    />
                                }

                                {
                                    selectedFilter.type === 'text' &&
                                    <Input
                                        placeholder={`Enter ${selectedFilter.label}`}
                                        className="form-control-sm font-size-nm"
                                        name={selectedFilter.name}
                                        onChange={handleFilterChange}
                                    />
                                }

                                {
                                    selectedFilter.type === 'date_range' &&
                                    <DateRangePicker
                                        classNames="form-control-sm form-control py-3"
                                        onApply={handleFilterChange}
                                    />
                                }
                            </Fragment>
                    }
                </div>
            </div>
            <IconButton aria-label="close" className={classes.closeButton} onClick={handleRemove}>
                <CloseIcon />
            </IconButton>
        </div>
    );
}

SingleFilter.propTypes = {
    id: PropTypes.string.isRequired,
    filterOptions: PropTypes.array.isRequired,
    onRemove: PropTypes.func,
    onSetFilter: PropTypes.func
};

export default pure(SingleFilter);

