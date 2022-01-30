import React, {useState} from "react";
import { pure } from "recompose";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core";
import Button from "../../../../components/button/Button";
import Select from "../../../../components/select/Select";

const HandlerModal = ({onClose, onAccept, handlers, defaultHandler}) => {
    const [handler, setHandler] = useState('');
    // const [handlerOptions, setHandlerOptions] = useState([]);

    const handleChange = (e) => {
        setHandler(e.currentTarget.value);
    }

    const handleAccept = () => {
        onAccept(handler);
    }

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

    const handlerOptions = handlers.map(item => {
        return {label: item.full_name, value: item._id}
    })

    return (
        <div className="p-0 px-sm-3 py-4">
            <DialogTitle id="alert-dialog-title mb-4">
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent className={classes.dialogContentRoot}>
                <DialogContentText id="alert-dialog-description">

                    <div className="mb-1 font-w600 text-dark">
                        Assign to handler
                    </div>

                    <div className="mb-3 font-size-nm text-muted">
                        Select handler to assign to
                    </div>

                    <Select
                        name="handler"
                        placeholder="Select handler"
                        value={handler}
                        label="Handler"
                        options={handlerOptions}
                        onChange={handleChange}
                    />

                    {/*Button*/}
                    <div className="pt-2 mt-3">
                        <Button disabled={!handler} className="Btn-blue Btn-standard text-white font-w100" onClick={handleAccept}>
                            Assign
                        </Button>
                    </div>

                </DialogContentText>
            </DialogContent>
        </div>
    );
};

export default pure(HandlerModal);
