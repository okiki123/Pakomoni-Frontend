import React, {useState} from "react";
import { pure } from "recompose";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {makeStyles} from "@material-ui/core";
import FileInput from "../../../../components/file-input/FileInput";
import Button from "../../../../components/button/Button";

const UploadsModal = ({onClose, onUpload}) => {
    const [placeholder, setPlaceholder] = useState('Choose File');
    const [file, setFile] = useState(null);

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

    const handleChange = (e) => {
        const file = e.target.files[0];
        setPlaceholder(file.name);
        setFile(file);
    }

    return (
        <div className="p-0 px-sm-3 py-4">
            <DialogTitle id="alert-dialog-title mb-4">
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent className={classes.dialogContentRoot}>
                <DialogContentText id="alert-dialog-description">

                    <FileInput placeholder={placeholder} onChange={handleChange} />

                    {/*Button*/}
                    <div className="pt-2">
                        <Button disabled={!file} className="btn Btn Btn-orange btn-block text-white Btn-h50" onClick={() => onUpload(file)}>
                            Upload
                        </Button>
                    </div>

                </DialogContentText>
            </DialogContent>
        </div>
    );
};

export default pure(UploadsModal);
