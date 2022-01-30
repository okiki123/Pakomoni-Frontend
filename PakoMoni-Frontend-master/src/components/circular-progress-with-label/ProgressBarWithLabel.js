import React from 'react';
import {pure} from "recompose";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import makeStyles from "@material-ui/core/styles/makeStyles";

const CircularProgressWithLabel = ({label, value, ...rest}) => {
    const useStylesFacebook = makeStyles((theme) => ({
        root: {
            position: 'relative',
        },
        bottom: {
            color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        },
        top: {
            color: '#0049AC',
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
        },
        circle: {
            strokeLinecap: 'round',
        },
    }));

    const classes = useStylesFacebook();

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress
                className={classes.bottom}
                variant="determinate"
                value={100}
                {...rest} />
            <CircularProgress
                variant="determinate"
                className={classes.top}
                classes={{
                    circle: classes.circle,
                }}
                value={value}
                {...rest} />

            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{label}</Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
    label: PropTypes.any.isRequired
};

export default pure(CircularProgressWithLabel);

