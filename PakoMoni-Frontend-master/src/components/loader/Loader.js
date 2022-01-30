import React, {Fragment} from "react";
import { pure } from "recompose";
import logoBlueOrangeShort from "../../assets/images/logo/logo__blue_orange_short.png";
import { connect } from "react-redux";

const Loader = ({ show }) => {
    return (
        <Fragment>
            {
                show &&
                <div className="Loader">
                    <div className="Loader__container">
                        <div className="round-border"></div>
                        <img className="Loader_image" src={logoBlueOrangeShort} />
                    </div>
                </div>
            }
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        show: state.app.showLoader
    }
}

export default connect(mapStateToProps)(pure(Loader));
