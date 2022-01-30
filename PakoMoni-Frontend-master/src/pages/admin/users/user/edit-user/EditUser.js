import React, {Fragment, useEffect} from "react";
import {pure} from "recompose";
import AdminLayout from "../../../../../layouts/admin/AdminLayout";
import UserForm from "../forms/UserForm";
import APP from "../../../../../store/actions/app-actions";
import ADMIN from "../../../../../store/actions/admin-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import userService from "../../../../../services/user-service";

const EditUser = ({history, user, match, showLoader, hideLoader, changeUser, enqueueSnackbar}) => {
    useEffect(() => {
        if (!user.hasOwnProperty('_id')) {
            getUser();
        }
    }, []);

    const getUser = async () => {
        console.log('here');
        try {
            const id = match.params.id;

            showLoader();

            const response = await userService.getUser(id);

            changeUser(response.data.data)

            hideLoader();

        } catch (err) {

            enqueueSnackbar(err, {
                variant: 'error'
            });

            hideLoader()

        }
    }

    return (
        <Fragment>
            {
                <AdminLayout history={history}>
                    <div className="my-1 py-3 BusinessRegistration">
                        <div className="mb-4">
                            <div className="font-size-xl mb-2 mb-md-0 font-w600">
                                Update user info
                            </div>
                            <div>
                                Kindly Provide the update details below
                            </div>
                        </div>

                        {
                            user.hasOwnProperty('_id') &&
                            <UserForm user={user} edit={true} />
                        }
                    </div>
                </AdminLayout>
            }
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        user: state.admin.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeUser: (user) => dispatch({type: ADMIN.CHANGE_USER, user})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(EditUser)));
