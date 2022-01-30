import React, {Fragment, useEffect, useState} from "react";
import {pure} from "recompose";
import AdminLayout from "../../../../layouts/admin/AdminLayout";
import Button from "../../../../components/button/Button";
import BaseModal from "../../../../components/base-modal/BaseModal";
import DeleteUserModal from "./modals/DeleteUserModal";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import moment from "moment";
import userService from "../../../../services/user-service";
import APP from "../../../../store/actions/app-actions";
import ADMIN from "../../../../store/actions/admin-actions";

const User = ({user, match, showLoader, hideLoader, changeUser, enqueueSnackbar}) => {
    useEffect(() => {
        if (!user.hasOwnProperty('_id')) {
            getUser();
            console.log('run');
        }
    }, []);

    const [deleteModelOpened, setDeleteModalOpened] = useState(false);

    const getUser = async () => {
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
                user.hasOwnProperty('_id') &&
                <AdminLayout>
                    <div className="my-1 py-3 BusinessRegistration">
                        <div className="d-md-flex justify-content-md-between align-items-center mb-5">
                            <div className="text-center text-md-left font-size-lg mb-2 mb-md-0 text-blue font-w600">
                                User - {user.full_name}
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button className="Btn-outline-blue mr-2" onClick={() => setDeleteModalOpened(true)}>
                                    Delete User
                                </Button>
                                <Button className="Btn-blue text-white" link={`/admin/user/update/${user._id}`}>
                                    Edit User
                                </Button>
                            </div>
                        </div>

                        <ul className="list-group">
                            {/*First Name*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3 col-6 font-w600">
                                        First Name
                                    </div>
                                    <div className="col-md-9 col-6">
                                        {user.full_name && user.full_name.split(' ')[0]}
                                    </div>
                                </div>
                            </li>
                            {/*Last Name*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3 col-6 font-w600">
                                        Last Name
                                    </div>
                                    <div className="col-md-9 col-6">
                                        {user.full_name && user.full_name.split(' ')[1]}
                                    </div>
                                </div>
                            </li>
                            {/*Email*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3 col-6 font-w600">
                                        Email Address
                                    </div>
                                    <div className="col-md-9 col-6">
                                        {user.email}
                                    </div>
                                </div>
                            </li>
                            {/*Phone number*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3 col-6 font-w600">
                                        Phone Number
                                    </div>
                                    <div className="col-md-9 col-6">
                                        {user.phone}
                                    </div>
                                </div>
                            </li>
                            {/*Date Created*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3 col-6 font-w600">
                                        Date Created
                                    </div>
                                    <div className="col-md-9 col-6">
                                        {user.created_at && moment(user.created_at).format('lll')}
                                    </div>
                                </div>
                            </li>
                            {/*Role*/}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-md-3 col-6 font-w600">
                                        Role
                                    </div>
                                    <div className="col-md-9 col-6">
                                        {user.role}
                                    </div>
                                </div>
                            </li>
                        </ul>

                        {/*Delete Modal*/}
                        <BaseModal
                            openState={deleteModelOpened}
                            maxWidth="sm"
                            fullWidth={true}
                            onClose={() => setDeleteModalOpened(false)}
                        >
                            <DeleteUserModal onClose={() => setDeleteModalOpened(false)} />
                        </BaseModal>
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

export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(pure(User)));

