import React, {useEffect, useState} from "react";
import { pure } from "recompose";
import Logo from "../logo/Logo";
import { NavLink, useLocation } from "react-router-dom";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from "@material-ui/core/IconButton";

const Sidebar = ({items, isExpanded, onCollapsed}) => {
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        setExpand(prevState => isExpanded);
    }, [isExpanded]);

    const visibleItems = items.filter(item => item.visible && !item.bottom);
    const bottomItems = items.filter(item => item.visible && item.bottom);

    const {pathname: currentRoute} = useLocation();

    const handleCollapsed = () => {
        setExpand(false);
        onCollapsed();
    }

    return (
        <div className={`Sidebar h-100 d-flex flex-column justify-content-between ${expand ? 'expanded' : ''}`}>
            <div>
                <div className="Sidebar__logo mb-5 d-flex justify-content-between">
                    <Logo link="/dashboard" type="white-orange" scale={1.7} />
                    <IconButton className="d-lg-none" onClick={handleCollapsed}>
                        <MenuOpenIcon fontSize="large" style={{color: "#ffffff"}} />
                    </IconButton>
                </div>

                {
                    visibleItems.map((item, index) => {
                        return (
                            <div key={index} className="my-3">
                                <NavLink className="Sidebar__link text-white d-flex align-items-center py-1" to={item.url}>
                                    <img
                                        className="mr-2"
                                        src={currentRoute === item.url ? item.activeIcon : item.icon}
                                        width={20} />
                                    <span>{item.label}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                {
                    bottomItems.map((item, index) => {
                        return (
                            <div key={index} className="my-3">
                                <NavLink className="Sidebar__link text-white d-flex align-items-center py-1" to={item.url}>
                                    <span>{item.label}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default pure(Sidebar);
