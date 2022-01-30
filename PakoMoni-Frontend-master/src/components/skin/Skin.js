import React, {Fragment} from "react";
import { pure } from "recompose";
import logoBlueOrange from "../../assets/images/logo/logo__blue_orange.png";

const Skin = () => {
    return (
        <Fragment>
            {
                <div className="Skin">
                    <img className="Skin__image" src={logoBlueOrange} />
                </div>
            }
        </Fragment>
    );
};

export default pure(Skin);
