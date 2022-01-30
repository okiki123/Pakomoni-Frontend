import React, {Fragment, useEffect} from "react";
import {pure} from "recompose";
import StorageService from "../../services/storage-service";
import AUTH from "../../store/actions/auth-actions";
import {connect} from "react-redux";
import APP from "../../store/actions/app-actions";

const SetUser = ({ changeUser, showLoader, hideLoader, children }) => {
    useEffect(async () => {
        const user = await StorageService.getItem('user');

        if (!user) changeUser(null);

        else changeUser(user);
    });

    return (
        <Fragment>
            {children}
        </Fragment>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user})
    }
}

export default connect(null, mapDispatchToProps)(pure(SetUser));
