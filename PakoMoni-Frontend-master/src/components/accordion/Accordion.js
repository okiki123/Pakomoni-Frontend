import React from "react";
import { pure } from "recompose";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const CustomAccordion = ({ disabled }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '50%',
        },
        heading: {
            // fontSize: theme.typography.pxToRem(15),
            // fontWeight: theme.typography.fontWeightRegular,
        },
    }));

    const classes = useStyles();

    return (
        <Accordion className={classes.root} disabled={disabled}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default pure(CustomAccordion);
