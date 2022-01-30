import React, {useState} from "react";
import { pure } from "recompose";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import PropTypes from "prop-types";
import adminItems from "../../components/sidebar/admin-items";

const AdminLayout = ({ title, children, headerType = null, history }) => {
    const [expand, setExpand] = useState(false);

    const handleExpand = () => {
        setExpand(prevState => true);
    }

    const handleCollapsed = () => {
        setExpand(prevState => false);
    }

    return (
        <div className="Dashboard">
            <Sidebar items={adminItems} isExpanded={expand} onCollapsed={handleCollapsed} />
            <div className="Dashboard__main flex-grow-1 h-100 d-flex flex-column">
                <Header type="admin" headerType={headerType} history={history} onExpand={handleExpand} />

                <div className="bg-light flex-grow-1">
                    {children}
                </div>
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    title: PropTypes.string,
    headerType: PropTypes.string,
    history: PropTypes.any
};

export default pure(AdminLayout);
