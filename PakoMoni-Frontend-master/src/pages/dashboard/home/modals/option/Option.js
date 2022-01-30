import React from "react";
import {pure} from "recompose";
import Radio from "@material-ui/core/Radio";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const Option = ({ open, title, content, onClick }) => {
    const useStyles = makeStyles((theme) => ({
        root1: {
            width: '100%',
            [theme.breakpoints.up("sm")]: {
                boxShadow: "none",
                backgroundColor: open ? "#E6F4FE" : "#FFFFFF",
            },
        },
        root2: {
            width: '100%',
            [theme.breakpoints.up("sm")]: {
                boxShadow: "none",
                backgroundColor: !open ? "#E6F4FE" : "#FFFFFF",
            },
        },
        accordionDetails: {
            display: "block"
        }
    }));

    const classes = useStyles();

    return (
        <div className="d-flex mb-3">
            <div className="mr-sm-2">
                <Radio
                    checked={open}
                    onClick={onClick}
                    value="a"
                    color="primary"
                    name="radio-button-demo"
                    inputProps={{ 'aria-label': 'A' }}
                    className="d-none d-sm-block"
                />
            </div>

            <div className="flex-grow-1">
                <Accordion className={classes.root1} expanded={open}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.summary}
                        onClick={onClick}
                    >
                        <Typography className={`font-w600 ${open ? "text-blue" : 'text-muted'}`}>{title}</Typography>
                    </AccordionSummary>
                    <div className="px-3">
                        <hr className="mt-0" />
                    </div>
                    <AccordionDetails className={classes.accordionDetails}>
                        {
                            content.map(item => (
                                <Typography className="mb-3 d-flex font-size-nm">
                                    <FontAwesomeIcon className="text-blue mr-4" icon={faCheck} />
                                    <span className="text-muted flex-grow-1">{item}</span>
                                </Typography>
                            ))
                        }
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

Option.propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.string,
    content: PropTypes.array,
    onClick: PropTypes.func
};

export default pure(Option);
