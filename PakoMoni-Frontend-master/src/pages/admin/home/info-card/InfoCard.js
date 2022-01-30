import React from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";

const InfoCard = ({ color, title, body, className = '' }) => {
    const colors = {
        orange: {
            header: '#f4b130',
            body: '#f9ebd1'
        },
        darkBlue: {
            header: '#0049ac',
            body: '#c8d6ea'
        },
        blue: {
            header: '#2699fb',
            body: '#cfe7fa'
        },
        red: {
            header: '#fb2626',
            body: '#F5D0D4'
        }
    };

    const styles = {
        header: {
            backgroundColor: colors[color].header,
            borderRadius: "8px 8px 0 0"
        },
        body: {
            backgroundColor: colors[color].body,
            borderRadius: "0 0 8px 8px",
            paddingTop: "20px",
            paddingBottom: "20px"
        }
    }

    return (
        <div className={`InfoCard d-flex mb-2 flex-column ${className}`}>
            <div className="p-2" style={styles.header}></div>
            <div className="d-flex flex-grow-1 flex-column justify-content-center px-3" style={styles.body}>
                    <div className="InfoCard__title text-dark-blue">{title}</div>
                    <div className="InfoCard__body font-w900 text-dark-blue">{body}</div>
            </div>
        </div>
    );
};

InfoCard.propTypes = {
    color: PropTypes.oneOf(["orange", "darkBlue", "blue", "red"]).isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    className: PropTypes.string
};

export default pure(InfoCard);
