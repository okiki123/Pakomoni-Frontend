import React, {useState} from "react";
import { pure } from "recompose";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import PropTypes from "prop-types";
import items from "../../components/sidebar/items";

const DashboardLayout = ({ title, children, history }) => {
    const [expand, setExpand] = useState(false);

    const handleExpand = () => {
        setExpand(prevState => true);
    }

    const handleCollapsed = () => {
        setExpand(prevState => false);
    }

    return (
        <div className="Dashboard">
            <Sidebar items={items} isExpanded={expand} onCollapsed={handleCollapsed} />
            <div className="Dashboard__main flex-grow-1 h-100 d-flex flex-column">
                <Header title={title} history={history} onExpand={handleExpand} />

                <div className="bg-light flex-grow-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

DashboardLayout.propTypes = {
    title: PropTypes.string.isRequired,
    history: PropTypes.any
};

export default pure(DashboardLayout);
