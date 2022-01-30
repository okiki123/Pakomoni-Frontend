import { pure } from "recompose";
import PropTypes from "prop-types";
import logoBlueOrange from "../../assets/images/logo/logo__blue_orange.png";
import logoBlueOrangeShort from "../../assets/images/logo/logo__blue_orange_short.png";
import logoWhiteOrange from "../../assets/images/logo/logo__white_orange.png";
import logoWhiteOrangeShort from "../../assets/images/logo/logo__white_orange_short.png";
import logoWhiteWhite from "../../assets/images/logo/logo__white_white.png";
import logoWhiteWhiteShort from "../../assets/images/logo/logo__white_white_short.png";
import {NavLink} from "react-router-dom";
import {Fragment} from "react";

const Logo = ({type = 'blue-orange', scale = 1, link = false}) => {
    const types = {
        'blue-orange': logoBlueOrange,
        'blue-orange-short': logoBlueOrangeShort,
        'white-orange': logoWhiteOrange,
        'white-orange-short': logoWhiteOrangeShort,
        'white-white': logoWhiteWhite,
        'white-white-short': logoWhiteWhiteShort
    }

    const baseWidth = 100;

    const width = baseWidth * scale;

    const style = {
        width: `${width}px`
    }

    return (
        <Fragment>
            {
                link ?
                    <NavLink to={link}><img src={types[type]} alt="Logo" style={style} /></NavLink> :
                    <img src={types[type]} alt="Logo" style={style} />
            }
        </Fragment>
    );
}

Logo.propTypes = {
    type: PropTypes.oneOf(['blue-orange', 'blue-orange-short', 'white-orange', 'white-orange-short', 'white-white', 'white-white-short']),
    scale: PropTypes.number
}

export default pure(Logo);
