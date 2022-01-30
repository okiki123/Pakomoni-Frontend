import React from "react";
import {pure} from "recompose";
import PropTypes from "prop-types";

const Panel = ({ className, title, children }) => {
    return (
        <div className={`Panel border-main ${className}`}>
            <div className="Panel__header bg-dark-blue text-white">
                <div className={`font-w600 ${title ? 'p-3' : 'p-0'}`}>{title}</div>
            </div>

            <div className="Panel__body text-transparent px-1 px-sm-3 py-3">
                {children}
            </div>
        </div>
    );
};

Panel.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
};

export default pure(Panel);
