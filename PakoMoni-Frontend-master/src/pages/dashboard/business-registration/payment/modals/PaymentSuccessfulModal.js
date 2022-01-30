import React from "react";
import { pure } from "recompose";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core";
import Button from "../../../../../components/button/Button";
import checkIcon from "../../../../../assets/images/icons/check.svg";

const PaymentSuccessfulModal = ({onClose, onFinish}) => {
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

    return (
        <div className="p-0 px-sm-3 py-4">
            <DialogTitle id="alert-dialog-title mb-4">
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent className={classes.dialogContentRoot}>
                <DialogContentText id="alert-dialog-description">

                   <div className="text-center mb-3">
                       <img src={checkIcon} alt="Icon" width="150" />
                   </div>

                    <div className="mb-4 text-center font-size-lg font-w600">
                        Your payment was successful
                    </div>

                    <div className="mb-4 text-center text-muted">
                        Thank you for your payment, an automated receipt has been sent to your email address
                    </div>

                    {/*Button*/}
                    <div className="pt-2">
                        <Button className="btn Btn Btn-orange btn-block text-white Btn-h50" onClick={onFinish}>
                            Continue
                        </Button>
                    </div>

                </DialogContentText>
            </DialogContent>
        </div>
    );
};

export default pure(PaymentSuccessfulModal);
