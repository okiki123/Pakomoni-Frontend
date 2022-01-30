import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {pure} from "recompose";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'transparent',
        color: '#0049AC',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#F4B130',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#0049AC',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(14),
        marginRight: theme.spacing(1),
        textAlign: 'left',
        opacity: 0.4,
        paddingLeft: '0',
        '&:focus': {
            opacity: 1,
            color: '#0049AC',
            outline: 'none'
        },
    },
    wrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
}))((
    props
) => <Tab disableRipple {...props} />);

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className="py-4">
                    {children}
                </Box>
            )}
        </div>
    );
}

const CustomTab = ({tabs = [], tabsContent = []}) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        padding: {
            padding: theme.spacing(3),
        },
        demo2: {
            backgroundColor: 'transparent'
        },
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='flex-grow-1 px-1 px-sm-3'>
            <div className={classes.demo2}>
                <StyledTabs value={value} onChange={handleChange} aria-label="styled tabs">
                    {
                        tabs.map((item, index) => <StyledTab label={item} key={index} />)
                    }
                </StyledTabs>

                {
                    tabsContent.map((item, index) => <TabPanel value={value} index={index} key={index}>{item}</TabPanel>)
                }
            </div>
        </div>
    );
}

CustomTab.propTypes = {
    tabs: PropTypes.array.isRequired,
    tabsContent: PropTypes.array.isRequired
}

export default pure(CustomTab);
