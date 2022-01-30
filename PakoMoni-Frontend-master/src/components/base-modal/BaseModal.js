import React, {useEffect} from 'react';
import {pure} from "recompose";
import Dialog from '@material-ui/core/Dialog';
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const BaseModal = ({ openState = false, children, onClose, onOpen, ...rest }) => {

    const theme = useTheme();

    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const useStyles = makeStyles((theme) => ({
        root: {
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        if (onOpen) onOpen();
    }, []);

    return (
        <div>
            <Dialog
                open={openState}
                onClose={onClose}
                fullScreen={fullScreen}
                scroll={"paper"}
                className={classes.root}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                {...rest}
            >
                {children}
            </Dialog>
        </div>
    );
}

BaseModal.propTypes = {
    openState: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    maxWidth: PropTypes.string,
    fullWidth: PropTypes.bool
};

export default pure(BaseModal);
