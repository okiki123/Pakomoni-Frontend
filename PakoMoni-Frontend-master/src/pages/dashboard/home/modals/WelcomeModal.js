import React, {useState} from "react";
import { pure } from "recompose";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core";
import Button from "../../../../components/button/Button";
import Option from "./option/Option";
import options from "./option/options";

const WelcomeModal = ({onClose, onAccept}) => {
    const [open1, setOpen1] = useState(false);

    const [option1, option2] = options;

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

    const handleClick = () => {
        onAccept(open1);
    }

    return (
        <div className="p-0 px-sm-3 py-4">
            <DialogTitle id="alert-dialog-title mb-4">
                <div className="d-sm-flex">
                    <div className="mr-3" style={{width: "42px"}}></div>
                    <div>
                        <div className="text-blue font-size-lg font-weight-bold mb-1 text-center text-sm-left">Welcome to PakoMoni</div>
                        <div className="font-size-nm text-center text-sm-left">
                            Which of the following best describes your business
                        </div>
                    </div>
                </div>
            </DialogTitle>

            <DialogContent className={classes.dialogContentRoot}>
                <DialogContentText id="alert-dialog-description">

                    {/*Option 2*/}
                    <Option
                        title={option2.title}
                        content={option2.content}
                        open={!open1}
                        onClick={() => setOpen1(false)}
                    />

                    {/*option 1*/}
                    <Option
                        title={option1.title}
                        content={option1.content}
                        open={open1}
                        onClick={() => setOpen1(true)}
                    />


                    {/*Button*/}
                    <div className="d-flex">
                        <div style={{width: "42px"}} className="mr-3 d-none d-sm-block"></div>
                        <Button className="btn Btn Btn-orange btn-block text-white Btn-h50" onClick={handleClick}>
                            Continue
                        </Button>
                    </div>

                </DialogContentText>
            </DialogContent>
        </div>
    );
};

export default pure(WelcomeModal);
