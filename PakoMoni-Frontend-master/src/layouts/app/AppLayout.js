import React, {Fragment} from "react";
import { pure } from "recompose";
import Nav from "./nav/Nav";
import Footer from "./footer/Footer";

const AppLayout = ({ children }) => {
    const style = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
    };

    return (
        <div style={style}>
            <Nav />
            <div className="flex-grow-1">{children}</div>
            <Footer />
        </div>
    );
};

export default pure(AppLayout);
