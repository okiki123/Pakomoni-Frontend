import { pure } from "recompose";
import {NavLink} from "react-router-dom";

const Footer = () => {
    return (
        <div className="Footer bg-light-blue">
            <div className="mxw-1200">
                <div className="d-md-flex justify-content-md-between">
                    <div className="mb-3 mb-md-0">
                        <div className="">2021 PakoMoni Technologies</div>
                        <div className="">info@pakomoni.com</div>
                    </div>
                    <div className="d-flex">
                        <div className="nav-item">
                            <NavLink className="nav-link pl-md-2 pl-0 mx-lg-2 text-dark" to="/" >FAQs</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink className="nav-link mx-lg-2 text-dark" to="/pricing" >Pricing</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pure(Footer);
