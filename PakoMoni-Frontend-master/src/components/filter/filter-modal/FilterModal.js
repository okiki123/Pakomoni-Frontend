import React, {useState} from "react";
import { pure } from "recompose";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles, Typography} from "@material-ui/core";
import Button from "../../button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import SingleFilter from "../SingleFilter";
import Utils from "../../../helpers/utils";
import PropTypes from "prop-types";

const FilterModal = ({filterOptions, onClose, onAccept}) => {
    const [filters, setFilters] = useState([]);
    const [filterValues, setFilterValues] = useState([]);

    const useStyles = makeStyles((theme) => ({
        dialogContentRoot: {
            [theme.breakpoints.down("xs")]: {
                padding: "10px"
            },
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }));

    const classes = useStyles();

    const handleAddFilter = () => {
        const newFilter = {name: '', value: '', id: Utils.generateRandomString(6)};
        setFilters(prevState => [...prevState, newFilter]);
    }

    const handleRemoveFilter = (id) => {
        const updatedFilters = filters.filter(filter => filter.id !== id);
        const updatedFilterValues = filterValues.filter(filter => filter.id !== id);
        setFilters(prevState => updatedFilters);
        setFilterValues(prevState => updatedFilterValues);
    }

    const handleSetFilter = (data) => {
        setFilterValues(prevState => [...prevState, data]);
    }

    const handleDone = () => {
        const filterObject = {};
        for (let item of filterValues) {
            filterObject[item.filter] = item.value;
        };
        onAccept(filterObject)
    }

    return (
        <div className="p-0 px-sm-3 py-4">
            <DialogTitle id="alert-dialog-title mb-4">
                Filter
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent className={classes.dialogContentRoot}>
                <DialogContentText id="alert-dialog-description">

                    {
                        filters.map((item, index) => {
                            return <SingleFilter
                                key={index}
                                id={item.id}
                                filterOptions={filterOptions}
                                onRemove={handleRemoveFilter}
                                onSetFilter={handleSetFilter}
                            />
                        })
                    }

                    <Button className="Btn-blue btn-sm font-size-nm text-white mb-3 text-right" onClick={handleAddFilter}>
                        <FontAwesomeIcon icon={faPlus} className='mr-1'></FontAwesomeIcon>
                        Add Filter
                    </Button>

                    <div className="pt-2">
                        <Button className="btn Btn Btn-orange btn-block text-white Btn-h50" onClick={handleDone}>
                            Continue
                        </Button>
                    </div>

                </DialogContentText>
            </DialogContent>
        </div>
    );
};

FilterModal.propTypes = {
    filterOptions: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    onAccept: PropTypes.func,
};

export default pure(FilterModal);
