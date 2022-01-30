import React, {Fragment} from 'react';
import { pure } from "recompose";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import MobileStepper from "@material-ui/core/MobileStepper";

const HorizontalStepper = ({ steps = [], activeStep = 0 }) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            border: "solid 1px #dbe2e8"
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }));

    const useIconStyles = makeStyles((theme) => ({
        step: {},
        active: {
            color: 'red',
        },
        completed: {
            color: 'red',
        },
        disabled: {}
    }));

    const maxSteps = steps.length;

    const classes = useStyles();
    const iconClasses = useIconStyles();

    return (
        <Fragment>
            <div className="d-none d-sm-block">
                <Stepper activeStep={activeStep} className={classes.root}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconProps={{
                                    classes: {
                                        root: iconClasses.step,
                                        completed: iconClasses.completed,
                                        active: iconClasses.active
                                    }
                                }}
                            >
                                {label}
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
            <div className="d-block d-sm-none">
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    className="w-100"
                    variant="progress"
                    activeStep={activeStep}
                    backButton={<div className="">{((activeStep + 1) / maxSteps) * 100}%</div>}
                    nextButton={<div className="">100%</div>}
                />
            </div>
        </Fragment>
    );
}

HorizontalStepper.propTypes = {
    steps: PropTypes.array.isRequired,
    activeStep: PropTypes.number.isRequired
};

export default pure(HorizontalStepper);
