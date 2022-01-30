import React from "react";
import { pure } from "recompose";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core";
import Button from "../../../../components/button/Button";

const DownloadingModal = ({onClose, onAccept}) => {
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

                    <div className="mb-2 text-center font-size-lg font-w600 text-dark">
                        Download Started
                    </div>

                    <div className="mb-5 text-center font-size-nm text-muted">
                        Your file should be downloading now
                    </div>

                    {/*Button*/}
                    <div className="pt-2 text-center">
                        <Button className="Btn-blue Btn-standard text-white" onClick={onClose}>
                            OK!
                        </Button>
                    </div>

                </DialogContentText>
            </DialogContent>
        </div>
    );
};

export default pure(DownloadingModal);
